async function predictEmail(email) {
    const response = await fetch('http://localhost:8000/predict', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({text: email})
    })
    const data = await response.json()
    document.getElementById("testing").textContent = data.prediction
    return data.prediction
}

predictEmail("Morning Mr Li, this is a reminder that your appointement is scheduled for 5pm today");