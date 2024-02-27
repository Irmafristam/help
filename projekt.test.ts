import {intro, begin_game, create_player, answer_checker, questions, upd_leaderboard, subjects_opt, Leaderboard } from './projekt'
/*
describe('intro', () => {
    test('resets points to 0 and returns begin_game', () => {
        const categories = [pair(1, 'Maths'), pair(2, 'English')];
        const username = 'John Doe';
        const result = intro(categories, username);
        // Assuming begin_game returns a function or void, you may need to adjust the assertion accordingly.
        expect(result).toEqual(expect.any(Function) || undefined);
        // Additional assertions if needed
    });
});

describe('begin_game', () => {
    // You may need to mock console.table and other dependencies as needed
    test('displays categories and returns category_checker', () => {
        const categories = [pair(1, 'Maths'), pair(2, 'English')];
        const result = begin_game(categories);
        // Assuming category_checker returns a function or void, you may need to adjust the assertion accordingly.
        expect(result).toEqual(expect.any(Function) || undefined);
        // Additional assertions if needed
    });
});
*/

test('creates a player with the correct properties', () => {
    const player_num = 1;
    const player_name = 'John Doe';
    const result = create_player(player_num, player_name);
    const player = {
        
    }
    expect(result).toEqual(player_name);
    // Additional assertions if needed
});

/*
describe('answer_checker', () => {
    // You may need to mock console.log and other dependencies as needed
    test('updates points and returns begin_game or upd_leaderboard', () => {
        const ans = 'a1';
        const sub = { key: 1, subject: 'Maths', questions: ['q1'], answers: ['a1'] };
        const random_q = 0;
        const categories = [pair(1, 'Maths'), pair(2, 'English')];
        const result = answer_checker(ans, sub, random_q, categories);
        // Assuming begin_game or upd_leaderboard returns a function or void, you may need to adjust the assertion accordingly.
        expect(result).toEqual(expect.any(Function) || undefined);
        // Additional assertions if needed
    });
});

describe('questions', () => {
    // You may need to mock console.log and other dependencies as needed
    test('displays a random question and returns answer_checker', () => {
        const sub = { key: 1, subject: 'Maths', questions: ['q1'], answers: ['a1'] };
        const categories = [pair(1, 'Maths'), pair(2, 'English')];
        const result = questions(sub, categories);
        // Assuming answer_checker returns a function or void, you may need to adjust the assertion accordingly.
        expect(result).toEqual(expect.any(Function) || undefined);
        // Additional assertions if needed
    });
});

describe('upd_leaderboard', () => {
    // You may need to mock console.log and other dependencies as needed
    test('updates leaderboard and displays player status', () => {
        const leaderboard: Leaderboard = [];
        const categories = [pair(1, 'Maths'), pair(2, 'English')];
        const result = upd_leaderboard(leaderboard, categories);
        // No direct return value, so you may need to assert the side effects.
        // Additional assertions if needed
    });
});

// Note: Adjust the test cases based on the actual behavior of your functions and the dependencies they use.
*/