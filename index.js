const express = require('express')
const bodyParser = require('body-parser');

const app = express();
const cors = require('cors')

app.use(cors())
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const USER_NOT_FOUND_ERROR = 'user_not_found_error'
var users = [
    {
        cpf: '209.284.440-74',
        name: 'maria eduarda',
        status: 'regular',
        account: [
            { accountNumber: '132744-7' },
            { accountNumber: '998244-4' },
        ]
    },
    {
        cpf: '767.770.350-01',
        name: 'joão alcionei',
        status: 'irregular',
        account: [
            { accountNumber: '132244-1' },
            { accountNumber: '555478-9' },
        ]
    },
    {
        cpf: '937.983.490-02',
        name: 'amanda heberle',
        status: 'regular',
        account: [
            { accountNumber: '132244-5' },
            { accountNumber: '592244-3' },
            { accountNumber: '132144-7' },
            { accountNumber: '362445-8' },
            { accountNumber: '132274-1' },
            { accountNumber: '452254-6' },
        ]
    },
]

app.get('/user', (req, res) => res.json({ users }));

app.get('/user/:cpf', (req, res) => {
    const { cpf } = req.params;

    let data = {
        user: users.find((user) => user.cpf == cpf)
    }

    if (!data.user) {
        data = {
            success: false,
            key: USER_NOT_FOUND_ERROR,
            message: 'Usuário não encontrado.'
        }
    }

    // Coloquei um timeOut apenas para exibir o loading lá no front
    setTimeout(() => res.json(data), 500);
});

app.post('/account/duplicate/:cpf', (req, res) => {
    const account = req.body;
    const { cpf } = req.params;

    let indexUsers = users.findIndex((user) => user.cpf === cpf);

    if (indexUsers) {
        users[indexUsers].account.push(account);
        res.json({ success: true });
    } else {
        res.json({ success: false });
    }
});

app.listen(3000, console.log("running.... (3000) "))
