const express = require('express')
const app = express()
const port = 8080

const numRoles = 5;
let roles = [];
for(let i = 0; i < 5; ++i) {
	roles[i] = {
		lastPing: 0,
		state: '0'
	}
}

app.get('/', (req, res) => {
  let role;
	if(req.query && req.query.role) {
		role = Math.min(req.query.role | 0, 100)
		roles[role].lastPing = Date.now();
	}

	// reset state if no ping in 10000ms
	roles = roles.map(state => 
		(10000 < (Date.now() - state.lastPing))
		? {... state, 'state': '0'}
		: state);

	if((typeof role === 'number') && req.query.newState) {
		roles[role].state = req.query.newState;
	}

	res.send(roles.map(o => o.state).join(''))
})

app.listen(port, () => console.log(`Example app listening on port ${port}!`))

