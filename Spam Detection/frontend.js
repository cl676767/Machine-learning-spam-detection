async function predictEmail(email) {
    const response = await fetch('http://localhost:8000/predict', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({text: email})
    })
    const data = await response.json()
    return data.prediction
}

document.getElementById("check").addEventListener("click",()=>{
    const text = document.getElementById("emailInput").value;
    const resultDiv = document.getElementById("result");
    resultDiv.classList.remove("spam","ham");
    
    predictEmail(text).then(prediction => {
        if (prediction =="1"){
            resultDiv.textContent = "This is a Spam email. Get this sh*t outta here";
            resultDiv.classList.add("spam");
        }
        else{
            resultDiv.textContent = "This is not a Spam email. You good cuh!";
            resultDiv.classList.add("ham");
        }
    });
})

//predictEmail("Morning Mr Li, this is a reminder that your appointement is scheduled for 5pm today");