"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.upd_leaderboard = exports.begin_game = exports.answer_checker = exports.questions = exports.category_checker = exports.answer_input = exports.category_chooser = exports.intro = exports.create_player = exports.input = exports.player_id = exports.player_hash = exports.scoreboard = exports.points = exports.subjects_opt = exports.category_hash = exports.all_subjects = exports.prompt = exports.Science = exports.History = exports.Geography = exports.English = exports.Maths = void 0;
var list_1 = require("../lib/list");
var hashtables_1 = require("../lib/hashtables");
var PromptSync = require("prompt-sync");
//import { Maths, English, Geography, History, Science } from './Project-group-18/areyousmarterlib';
exports.Maths = {
    key: 1,
    subject: "Maths",
    questions: ["q1", "q2", "q3"],
    answers: ["a1", "a2", "a3"]
};
exports.English = {
    key: 2,
    subject: "English",
    questions: ["q1", "q2", "q3"],
    answers: ["a1", "a2", "a3"]
};
exports.Geography = {
    key: 3,
    subject: "Geography",
    questions: ["q1", "q2", "q3"],
    answers: ["a1", "a2", "a3"]
};
exports.History = {
    key: 4,
    subject: "History",
    questions: ["q1", "q2", "q3"],
    answers: ["a1", "a2", "a3"]
};
exports.Science = {
    key: 5,
    subject: "Science",
    questions: ["q1", "q2", "q3"],
    answers: ["a1", "a2", "a3"]
};
// END OF TYPES
// GLOBAL VARIABLES
exports.prompt = PromptSync({ sigint: true });
exports.all_subjects = [exports.Maths, exports.English, exports.Geography, exports.History, exports.Science];
exports.category_hash = (0, hashtables_1.ph_empty)(exports.all_subjects.length, (0, hashtables_1.probe_quadratic)(hashtables_1.hash_id));
exports.subjects_opt = [(0, list_1.pair)(exports.all_subjects[0].key, exports.all_subjects[0].subject), (0, list_1.pair)(exports.all_subjects[1].key, exports.all_subjects[1].subject),
    (0, list_1.pair)(exports.all_subjects[2].key, exports.all_subjects[2].subject), (0, list_1.pair)(exports.all_subjects[3].key, exports.all_subjects[3].subject),
    (0, list_1.pair)(exports.all_subjects[4].key, exports.all_subjects[4].subject)];
exports.points = 0;
exports.scoreboard = []; // Inte generell i answer checker
exports.player_hash = (0, hashtables_1.ph_empty)(10, (0, hashtables_1.probe_quadratic)(hashtables_1.hash_id));
exports.player_id = exports.player_hash.keys.length - 10;
//END OF GLOBAL
/**
 * VARFÖR???
 */
for (var i = 0; i < exports.all_subjects.length; i++) {
    (0, hashtables_1.ph_insert)(exports.category_hash, exports.all_subjects[i].key, exports.all_subjects[i]);
}
/**
 *
 * @returns
 */
function input() {
    console.log('\nWelcome to Are you smarter than a fifth grader!\n');
    var user_input = (0, exports.prompt)("What is your name?: ");
    var name = user_input;
    exports.player_id = exports.player_id + 1;
    console.log('Your player id is: ', exports.player_id);
    return create_player(exports.player_id, name);
}
exports.input = input;
function create_player(player_num, player_name) {
    var player = {
        id: player_num,
        name: player_name,
        player_points: exports.points,
        player_categories: [],
        player_questions: [], //TA BORT, kanske
        player_answers: []
    };
    (0, hashtables_1.ph_insert)(exports.player_hash, player.id, player);
    return player.name;
}
exports.create_player = create_player;
/**
 *
 * @param categories
 * @param username
 * @returns
 */
function intro(categories, username) {
    console.log("Lets go", username);
    exports.points = 0;
    begin_game(categories);
}
exports.intro = intro;
/**
 *
 * @returns
 */
function category_chooser() {
    var act_player = (0, hashtables_1.ph_lookup)(exports.player_hash, exports.player_id);
    var choose_category = (0, exports.prompt)('What category do you choose? ');
    var act_category = parseInt(choose_category);
    act_player.player_categories.push(act_category);
    return act_category;
}
exports.category_chooser = category_chooser;
/**
 *
 * @returns
 */
function answer_input() {
    var act_player = (0, hashtables_1.ph_lookup)(exports.player_hash, exports.player_id);
    var user_ans = (0, exports.prompt)("Your answer: ");
    act_player.player_answers.push(user_ans);
    var answer_index = act_player.player_answers.length - 1;
    var act_answer = act_player.player_answers[answer_index];
    return act_answer;
}
exports.answer_input = answer_input;
function category_checker(category, category_n) {
    var act_player = (0, hashtables_1.ph_lookup)(exports.player_hash, exports.player_id);
    var act_sub = (0, hashtables_1.ph_lookup)(exports.category_hash, category_n);
    var search_category = category.findIndex(function (x) { return (0, list_1.head)(x) === category_n; });
    if (act_sub !== undefined && search_category !== -1) {
        return questions(act_sub, category);
    }
    else {
        console.log("Sorry that category does not exist, please pick another:");
        return begin_game(category); //kanske fixa !
    }
}
exports.category_checker = category_checker;
function questions(sub, categories) {
    var act_player = (0, hashtables_1.ph_lookup)(exports.player_hash, exports.player_id);
    if (sub !== undefined && act_player !== undefined) {
        var used_sub_1 = (0, list_1.pair)(sub.key, sub.subject);
        var new_category = categories.filter(function (x) { return (0, list_1.head)(x) !== (0, list_1.head)(used_sub_1); });
        var question_length = sub.questions.length;
        var random_question = Math.floor(Math.random() * question_length);
        console.log(sub.questions[random_question]);
        //act_player.player_questions.push(sub.questions[random_question]) 
        return answer_checker(answer_input(), sub, random_question, new_category);
    }
    else { }
}
exports.questions = questions;
/**
 *
 * @returns
 */
function answer_checker(ans, sub, random_q, categories) {
    var act_player = (0, hashtables_1.ph_lookup)(exports.player_hash, exports.player_id);
    var correct_ans = sub.answers[random_q]; //let eller const???
    if (categories.length !== 0) {
        if (ans === correct_ans) {
            exports.points = exports.points + 10;
            console.log("\nCorrect answer, you get 10 points! Your score is: ", exports.points);
            return begin_game(categories);
        }
        else {
            console.log("\nWrong answer! Your score is still: ", exports.points);
            return begin_game(categories);
        }
    }
    else {
        if (ans === correct_ans) {
            exports.points = exports.points + 10;
            console.log("\nCorrect answer, you get 10 points! Your score is: ", exports.points);
            act_player.player_points = exports.points;
            return upd_leaderboard(exports.scoreboard, categories);
        }
        else {
            console.log("\nWrong answer!");
            act_player.player_points = exports.points;
            return upd_leaderboard(exports.scoreboard, categories);
        }
    }
}
exports.answer_checker = answer_checker;
function begin_game(category) {
    console.log("Here are your categories: \n");
    console.table(category);
    return category_checker(category, category_chooser());
}
exports.begin_game = begin_game;
function upd_leaderboard(leaderboard, categories) {
    var act_player = (0, hashtables_1.ph_lookup)(exports.player_hash, exports.player_id);
    var insert_player = {
        name: act_player.name,
        total_score: act_player.player_points
    };
    if (leaderboard[0] === undefined) {
        console.log("Good job, your total score is: ", act_player.player_points);
        leaderboard.push(insert_player);
    }
    else {
        console.log("Good job, your total score is: ", act_player.player_points);
        leaderboard.push(insert_player);
        leaderboard.sort(function (a, b) { return b.total_score - a.total_score; });
    }
    console.log("Check your status on the leaderboard!\n");
    console.table(leaderboard);
    //return new_round(categories)
}
exports.upd_leaderboard = upd_leaderboard;
/*export function new_round(categories: Subject_options): Function | void {
    categories = []
    categories.push(pair(all_subjects[0].key, all_subjects[0].subject), pair(all_subjects[1].key, all_subjects[1].subject),
                      pair(all_subjects[2].key, all_subjects[2].subject), pair(all_subjects[3].key, all_subjects[3].subject),
                      pair(all_subjects[4].key, all_subjects[4].subject))
    let start_again = false
    const new_game = prompt("Is the next player ready? yes/no: ")
        if (new_game === "yes") {
            start_again = true
            return intro(categories, input())
        } else if (new_game === "no") {
            console.log("Thank you for playing!\n")
        }
}

*/
console.log(intro(exports.subjects_opt, input()));
