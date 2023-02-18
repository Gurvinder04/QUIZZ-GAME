//https://the-trivia-api.com/api/questions?categories=food_and_drink&limit=5&region=IN&difficulty=easy

const showQuestion = document.querySelector('#showQuestion')
const showAnswer = document.querySelector("#showAnswer")
const btn = document.querySelector("#btn")
const answer_btn = document.querySelector("#answer_btn")

const allQuestions =[]
const fetchQuizz = async()=>{
    let data = await fetch('https://the-trivia-api.com/api/questions?categories=sport_and_leisure&limit=5&region=IN&difficulty=easy')
    let res = await data.json()
     res.map(item=>{
         allQuestions.push(item)
    })
     displayQuizz()
}
const randomQuestionArray = []
const randomGenerate = ()=>{
    while(randomQuestionArray.length <=4){
       let randomQuestion = Math.floor(Math.random()*5)
       if(randomQuestionArray.indexOf(randomQuestion) === -1){
        randomQuestionArray.push(randomQuestion)
        }
        //i++
    }
    return randomQuestionArray;
}

const shuffleArray=(array) =>{
    for (var i = array.length - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));
        var temp = array[i];
        array[i] = array[j];
        array[j] = temp;
    }
    temp =0;
    return array;
}
var check =[];var correct;
let j = 0;
const displayQuizz =()=>{
       let randomNumber= randomGenerate();
        console.log('generated numbr is',randomNumber)
         let question1 = allQuestions[randomNumber[j]].question;
         showQuestion.innerHTML = `Q${j+1}.${question1}`
       let  answer1 = allQuestions[randomNumber[j]].incorrectAnswers;
       let  answer2 = allQuestions[randomNumber[j]].correctAnswer;
       correct=answer2
         console.log('before',answer1)
         answer1.push(answer2)
         console.log('after',answer1)
         let temp_Answers=shuffleArray(answer1)
         check = temp_Answers;
         console.log('shuffled array is', temp_Answers)
         temp_Answers.forEach((item,key)=>{
            console.log('item is',item)
            showAnswer.innerHTML += `<button id="answer_btn" key=${key} onclick="check_answer(${key})">${item}</button>`
        //     const div = document.createElement('div')
        //     div.innerHTML += `<div class="answers">${item}</div>`
        //    document.querySelector('#showAnswer').append(div);
         })
          temp_Answers = []
         j++;
         if(j===5){
            btn.innerText = 'Submit'
         }
         else{
            btn.innerText ='Next'
         }
      console.log('j is',j)
     
    }

     const displayAnswers =()=>{

     }   


btn.addEventListener('click',()=>{
    console.log('button clicked')
    switch(btn.innerText.toLowerCase()){
        case 'start':
            showQuestion.style.display='inline-block';
            showAnswer.style.display='inline-block';
            fetchQuizz()
            break;
        
        case 'next':
            console.log('entered next')
            console.log('option choose is',option_choose)
            if(option_choose !==null){
           showAnswer.innerHTML =""
            displayQuizz();
            option_choose=null;
            }
            else{
                window.alert('please choose one option')
            }
            break;
        case 'submit':
            showQuestion.style.display='none';
            showAnswer.innerHTML="";
            btn.innerText='Start again';
            totalScore()
            break;
        case 'start again':
            showQuestion.innerHTML="";
            showAnswer.innerHTML="";
            j=0;
            btn.innerText = 'start'
    }
})
 var points =0;var option_choose;
const check_answer=(item)=>{
       console.log('entered check answer',item)
       option_choose = check[item]
       console.log('choosen value is',option_choose)
       console.log('correct value is',correct)
        if(option_choose === correct){
            points++;
        }
        // else{
        //     window.alert('please choose one option')
        //     return -1;
        // }



       //score=points
       console.log('point is',points)
}
const totalScore=()=>{
        showAnswer.innerHTML +=`<p style="font-size:3rem">Your score is ${points}/5.</p>`
}