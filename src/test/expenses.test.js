import { addExpense } from '../action/expenses'
import moment from 'moment'


test('Checking if the data truly adds(addExpense)', () => {

    const expenses = {

        description: '',
        note: '',
        amount: '',
        createdAt: ''
    }

    const action = addExpense(expenses);
    expect(action).toEqual({
        type: 'ADD_EXPENSE',
        expense: {
            ...expenses,
            id: expect.any(String)
        }
    })
})