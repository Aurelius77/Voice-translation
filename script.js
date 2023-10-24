const btn = document.querySelector('.btn');
const stopBtn = document.querySelector('.btn-2');
const output = document.querySelector('.output');
const recognition = new webkitSpeechRecognition();
const trans = document.querySelector('.trans')

recognition.lang = 'en-US'; // Set the language, adjust as needed

recognition.onresult = (event) => {
    const result = event.results[0][0].transcript;
    output.textContent = 'You said: ' + result;
};

recognition.onerror = (event) => {
    console.error('Speech recognition error:', event.error);
};

btn.addEventListener('click', () => {
    output.textContent = ''
    recognition.start();
});

stopBtn.addEventListener('click', () => {
    recognition.stop();
});

recognition.onend = async () => {
    const url = 'https://text-translator2.p.rapidapi.com/translate';
    const options = {
        method: 'POST',
        headers: {
            'content-type': 'application/x-www-form-urlencoded',
            'X-RapidAPI-Key': `Your api key`,
            'X-RapidAPI-Host': 'text-translator2.p.rapidapi.com'
        },
        body: new URLSearchParams({
            source_language: 'en',
            target_language: 'es',
            text: output.textContent
        })
    };

    try {
        const response = await fetch(url, options);
        const result = await response.json();
        trans.textContent = result.data.translatedText;
        const speech = new SpeechSynthesisUtterance(trans.textContent);
        speech.lang = 'es-ES'
        window.speechSynthesis.speak(speech);
    } catch (error) {
        console.error(error);
    }
};
