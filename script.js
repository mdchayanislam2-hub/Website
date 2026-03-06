// আপনার জাভাস্ক্রিপ্ট ফাইল (script.js)
const DB_URL = "https://your-database-link.firebaseio.com/movies.json";

async function saveMovie() {
    const title = document.getElementById('title').value;
    const url = document.getElementById('url').value; 

    if (title && url) {
        // ইন্টারনেটে ডাটাবেসে সেভ হচ্ছে
        await fetch(DB_URL, {
            method: 'POST',
            body: JSON.stringify({ title: title, url: url })
        });
        alert("অনলাইনে সেভ হয়েছে!");
        loadMovies(); // সাথে সাথে তালিকা আপডেট
    }
}

async function loadMovies() {
    const gallery = document.getElementById('gallery');
    try {
        const res = await fetch(DB_URL);
        const data = await res.json();
        gallery.innerHTML = '';
        
        for (let id in data) {
            gallery.innerHTML += `
                <div class="card">
                    <h3>${data[id].title}</h3>
                    <video controls src="${data[id].url}" style="width:100%"></video>
                    <button onclick="deleteMovie('${id}')">ডিলিট</button>
                </div>`;
        }
    } catch (e) { console.log("ডাটা লোড হচ্ছে না"); }
}

window.onload = loadMovies;
