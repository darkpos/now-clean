#!/usr/bin/env node

const chalk = require('chalk')
const processArgs = require('minimist')
const Now = require('now-client')

const argv = processArgs(process.argv.slice(2), {
	alias: {
		t: 'token',
		r: 'remove',
		n: 'name',
		h: 'help'
	}
})

if (argv.help) {
	console.log(`Arguments:
-t  --token
  (will use your local one like the now cli, if available)

-n  --name
  (my-dark-app)

-r  --remove
  (will remove the marked deployments)`)

	process.exit(1)
}

const now = new Now(argv.token)

now.getDeployments().then(deployments => {
	const appDeployments = deployments
		.filter(deployment => (argv.name) ? deployment.name === argv.name : true)
		.sort((a, b) => a.name.localeCompare(b.name));

	console.log('> %s deployments found', appDeployments.length);
	appDeployments
		.reduce((a, b) => {
			let i = a.findIndex(c => c[b.name]);
			(i == -1) ? a.push({ [b.name]: [].concat(b) }) : a[i][b.name].push(b);
			return a;
		}, [])
		.forEach((a) => {
			let name = Object.keys(a)[0];
			console.log('\n'+chalk.bold(name)+'\n')
			a[name].sort((a, b) => b.created - a.created).forEach((deployment, num) => {
				if (num && argv.remove) {
					now.deleteDeployment(deployment.uid)
				}
				console.log('  %s      https://%s      %s', deployment.uid, deployment.url, (num) ? ((argv.remove) ? 'removed' : 'marked for removal') : '')
			});
		});
}).then(() => console.log('\n')).catch(err => console.error(err))
