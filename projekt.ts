import {type List, type Pair, head, list, pair, length, remove, filter, is_null, list_ref } from '../lib/list'
import { ProbingHashtable, hash_id, ph_empty, ph_insert, ph_lookup, probe_quadratic } from '../lib/hashtables'
import * as PromptSync from "prompt-sync";
//import { Maths, English, Geography, History, Science } from './Project-group-18/areyousmarterlib';
export const Maths: Subject = {
    key: 1,
    subject: "Maths",
    questions: ["q1", "q2", "q3"],
    answers: ["a1", "a2", "a3"]
}

export const English: Subject = {
    key: 2,
    subject: "English",
    questions: ["q1", "q2", "q3"],
    answers: ["a1", "a2", "a3"]
}

export const Geography: Subject = {
    key: 3,
    subject: "Geography",
    questions: ["q1", "q2", "q3"],
    answers: ["a1", "a2", "a3"]
}

export const History: Subject = {
    key: 4,
    subject: "History",
    questions: ["q1", "q2", "q3"],
    answers: ["a1", "a2", "a3"]
}

export const Science: Subject = {
    key: 5,
    subject: "Science",
    questions: ["q1", "q2", "q3"],
    answers: ["a1", "a2", "a3"]
}


// TYPES

export type Subject = {
    key: number,
    subject: string,
    questions: Array<string>,
    answers: Array<string> 
}

export type Category_table = ProbingHashtable<number, Subject>

export type Subject_options = Array<Pair<number, string>>

export type Name = string

export type Player = {
    id: number,
    name: string,
    player_points: number,
    player_categories: Array<number>,
    player_questions: Array<string>,
    player_answers: Array<string>
}

export type Player_table = ProbingHashtable<number, Player>

export type Leaderboard_player = {
    name: string,
    total_score: number
}

export type Leaderboard = Array<Leaderboard_player>
// END OF TYPES


// GLOBAL VARIABLES
export const prompt: PromptSync.Prompt = PromptSync({ sigint: true })

export let all_subjects: Array<Subject> = [Maths, English, Geography, History, Science]

export let category_hash: Category_table = ph_empty(all_subjects.length, probe_quadratic(hash_id))

export let subjects_opt: Subject_options = [pair(all_subjects[0].key, all_subjects[0].subject), pair(all_subjects[1].key, all_subjects[1].subject), 
                                                 pair(all_subjects[2].key, all_subjects[2].subject), pair(all_subjects[3].key, all_subjects[3].subject), 
                                                 pair(all_subjects[4].key, all_subjects[4].subject)]


export let points = 0

export let scoreboard: Leaderboard = [] // Inte generell i answer checker

export let player_hash: Player_table = ph_empty(10, probe_quadratic(hash_id))

export let player_id = player_hash.keys.length - 10
//END OF GLOBAL

/**
 * VARFÖR???
 */
for(let i = 0; i < all_subjects.length; i++) { 
    ph_insert(category_hash, all_subjects[i].key, all_subjects[i])
}

/**
 * 
 * @returns 
 */
export function input(): string {
    console.log('\nWelcome to Are you smarter than a fifth grader!\n')
    let user_input: Name = prompt("What is your name?: ")
    let name = user_input
    player_id = player_id + 1
    console.log('Your player id is: ', player_id)
    return create_player(player_id, name)
}


export function create_player(player_num: number, player_name: string): string {
    let player = {
        id: player_num,
        name: player_name,
        player_points: points,
        player_categories: [],
        player_questions: [], //TA BORT, kanske
        player_answers: []
    }
    ph_insert(player_hash, player.id, player)
    return player.name
}


/**
 * 
 * @param categories 
 * @param username 
 * @returns 
 */
export function intro(categories: Subject_options, username: Name): Function | void {
    console.log("Lets go", username)
    points = 0
    return begin_game(categories)
}

/**
 * 
 * @returns 
 */
export function category_chooser(): number {
    let act_player = ph_lookup(player_hash, player_id)
    let choose_category: string = prompt('What category do you choose? ')
    let act_category: number = parseInt(choose_category)
    act_player!.player_categories.push(act_category)
    return act_category
}

/**
 * 
 * @returns 
 */
export function answer_input(): string {
    let act_player = ph_lookup(player_hash, player_id)
    let user_ans: string = prompt("Your answer: ")
    act_player!.player_answers.push(user_ans)
    let answer_index: number = act_player!.player_answers.length -1
    let act_answer = act_player!.player_answers[answer_index]
    return act_answer
}

export function category_checker(category: Subject_options, category_n: number): Function | void {
    let act_player = ph_lookup(player_hash, player_id)
    let act_sub = ph_lookup(category_hash, category_n) 
    let search_category = category.findIndex(x => head(x) === category_n)
    if (act_sub !== undefined && search_category !== -1) {
        return questions(act_sub, category)
    } else {
        console.log("Sorry that category does not exist, please pick another:")
        return begin_game(category) //kanske fixa !
    }
}

export function questions(sub: Subject, categories: Subject_options): Function | void {
    let act_player = ph_lookup(player_hash, player_id)
    if (sub !== undefined && act_player !== undefined) {
        const used_sub: Pair<number, string> = pair(sub.key, sub.subject)
        const new_category: Subject_options = categories.filter(x => head(x) !== head(used_sub))
        const question_length: number = sub.questions.length
        const random_question: number = Math.floor(Math.random() * question_length)
        console.log(sub.questions[random_question])
        //act_player.player_questions.push(sub.questions[random_question]) 
        return answer_checker(answer_input(), sub, random_question, new_category)
    } else {}
}

/**
 * 
 * @returns 
 */
export function answer_checker(ans: string, sub: Subject, random_q: number, categories: Subject_options): Function | void {
    let act_player = ph_lookup(player_hash, player_id)
    const correct_ans: string = sub.answers[random_q] //let eller const???
    if(categories.length !== 0) {
        if(ans === correct_ans) {
            points = points + 10
            console.log("\nCorrect answer, you get 10 points! Your score is: ", points) 
            return begin_game(categories)
        } else {
            console.log("\nWrong answer! Your score is still: ", points)
            return begin_game(categories)
        }
    } else {
        if(ans === correct_ans) {
            points = points + 10
            console.log("\nCorrect answer, you get 10 points! Your score is: ", points)
            act_player!.player_points = points
            return upd_leaderboard(scoreboard, categories)
        } else {
            console.log("\nWrong answer!")
            act_player!.player_points = points
            return upd_leaderboard(scoreboard, categories)
        }
    }
}

export function begin_game(category: Subject_options): Function | void {
    console.log("Here are your categories: \n")
    console.table(category)
    return category_checker(category, category_chooser())
}

export function upd_leaderboard(leaderboard: Leaderboard, categories: Subject_options): void {
    let act_player = ph_lookup(player_hash, player_id)
    let insert_player: Leaderboard_player = {
        name: act_player!.name,
        total_score: act_player!.player_points
    }
    if(leaderboard[0] === undefined) {
        console.log("Good job, your total score is: ", act_player!.player_points)
        leaderboard.push(insert_player)
    } else {
        console.log("Good job, your total score is: ", act_player!.player_points)
        leaderboard.push(insert_player)
        leaderboard.sort((a, b) => b.total_score - a.total_score)
    }
    console.log("Check your status on the leaderboard!\n")
    console.table(leaderboard)
    //return new_round(categories)
}

export function new_round(categories: Subject_options): Function | void {
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


//console.log(intro(subjects_opt, input()))
