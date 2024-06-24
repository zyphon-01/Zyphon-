//dowlod youtube 
var YouTube = document.querySelector('.YouTube');
var format = document.querySelector('.format');
var hidden = document.querySelector('.hidden');
var Idurl = document.querySelector('.Idurl');
var result1 = document.querySelector('.result1');
var result2 = document.querySelector('.result2');

function preview() {
        if (YouTube.value.indexOf("https://youtu.be/") != -1) {
                var url1 = YouTube.value.replace("https://youtu.be/", "https://www.youtube.com/embed/");
                document.querySelector('.result1').innerHTML = `<iframe width="100%" height="190" src="${url1}" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>`
        }
        else if (YouTube.value.indexOf("https://www.youtube.com/watch?v=") != -1) {
                var url1 = YouTube.value.replace("https://www.youtube.com/watch?v=", "https://www.youtube.com/embed/");
                document.querySelector('.result1').innerHTML = `<iframe width="100%" height="190" src="${url1}" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>`;
        }
        else if (YouTube.value.indexOf("https://youtube.com/shorts/") != -1) {
                var url1 = YouTube.value.replace("https://youtube.com/shorts/", "https://www.youtube.com/embed/");
                var urlSe = url1.replace("?feature=share", "");
                document.querySelector('.result1').innerHTML = `<iframe width="100%" height="190" src="${urlSe}" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>`;
        }
}

function GetId() {
        if (YouTube.value != "") {
                if (YouTube.value.indexOf("https://youtu.be/") != -1) {
                        var url1 = YouTube.value.replace("https://youtu.be/", "");
                        document.querySelector('.Idurl').value = url1;
                }
                else if (YouTube.value.indexOf("https://www.youtube.com/watch?v=") != -1) {
                        var url1 = YouTube.value.replace("https://www.youtube.com/watch?v=", "");
                        document.querySelector('.Idurl').value = url1;
                }
                else if (YouTube.value.indexOf("https://youtube.com/shorts/") != -1) {
                        var url1 = YouTube.value.replace("https://youtube.com/shorts/", "");
                        var urlSe = url1.replace("?feature=share", "");
                        document.querySelector('.Idurl').value = urlSe;
                }
        }
}

function Getdownload() {
        GetId();
        if (YouTube.value != "") {
                switch (format.value) {
                        case "Thumbnail":
                                hidden.classList.add('active');
                                result1.classList.add('active');
                                var url2 = `https://img.youtube.com/vi/${Idurl.value}/maxresdefault.jpg`;
                                document.querySelector('.result1').innerHTML = `<img src="${url2}" class="thumbnail"/>`;
                                document.querySelector('.form-control').value = url2;
                                document.querySelector('.result2').innerHTML = `<button class="Get" onclick="download()">Download Video Thumbnail</button>`;
                                break;
                        case "mp3":
                                hidden.classList.add('active');
                                result1.classList.add('active');
                                var url2 = `https://loader.to/api/button/?url=https://youtu.be/${Idurl.value}&f=mp3`;
                                document.querySelector('.result2').innerHTML = `<iframe style="width:100%;height:45px;border:hidden;overflow:hidden;" scrolling="no" src="${url2}"></iframe>`;
                                preview();
                                break;
                        case "m4a":
                                hidden.classList.add('active');
                                result1.classList.add('active');
                                var url2 = `https://loader.to/api/button/?url=https://youtu.be/${Idurl.value}&f=m4a`;
                                document.querySelector('.result2').innerHTML = `<iframe style="width:100%;height:45px;border:hidden;overflow:hidden;" scrolling="no" src="${url2}"></iframe>`;
                                preview();
                                break;
                        case "360":
                                hidden.classList.add('active');
                                result1.classList.add('active');
                                var url2 = `https://loader.to/api/button/?url=https://youtu.be/${Idurl.value}&f=360`;
                                document.querySelector('.result2').innerHTML = `<iframe style="width:100%;height:45px;border:hidden;overflow:hidden;" scrolling="no" src="${url2}"></iframe>`;
                                preview();
                                break;
                        case "480":
                                hidden.classList.add('active');
                                result1.classList.add('active');
                                var url2 = `https://loader.to/api/button/?url=https://youtu.be/${Idurl.value}&f=480`;
                                document.querySelector('.result2').innerHTML = `<iframe style="width:100%;height:45px;border:hidden;overflow:hidden;" scrolling="no" src="${url2}"></iframe>`;
                                preview();
                                break;
                        case "720":
                                hidden.classList.add('active');
                                result1.classList.add('active');
                                var url2 = `https://loader.to/api/button/?url=https://youtu.be/${Idurl.value}&f=720`;
                                document.querySelector('.result2').innerHTML = `<iframe style="width:100%;height:45px;border:hidden;overflow:hidden;" scrolling="no" src="${url2}"></iframe>`;
                                preview();
                                break;
                        case "1080":
                                hidden.classList.add('active');
                                result1.classList.add('active');
                                var url2 = `https://loader.to/api/button/?url=https://youtu.be/${Idurl.value}&f=1080`;
                                document.querySelector('.result2').innerHTML = `<iframe style="width:100%;height:45px;border:hidden;overflow:hidden;" scrolling="no" src="${url2}"></iframe>`;
                                preview();
                                break;
                        case "4k":
                                hidden.classList.add('active');
                                result1.classList.add('active');
                                var url2 = `https://loader.to/api/button/?url=https://youtu.be/${Idurl.value}&f=4k`;
                                document.querySelector('.result2').innerHTML = `<iframe style="width:100%;height:45px;border:hidden;overflow:hidden;" scrolling="no" src="${url2}"></iframe>`;
                                preview();
                                break;
                        case "8k":
                                hidden.classList.add('active');
                                result1.classList.add('active');
                                var url2 = `https://loader.to/api/button/?url=https://youtu.be/${Idurl.value}&f=8k`;
                                document.querySelector('.result2').innerHTML = `<iframe  scrolling="no" src="${url2}"></iframe>`;
                                preview();
                                break;
                }
        }
        else {
                alert('Enter Your YouTube Url');
        }
}
var url = document.querySelector('.form-control');

function download() {
        const anchor = document.createElement("a");
        anchor.href = url.value;
        anchor.download = 'MWC.jpg';
        document.body.appendChild(anchor);
        anchor.click();
        document.body.removeChild(anchor);
}






 
  //Api youtube


const apiKey = 'AIzaSyDm0SbnOUVPW8redSztV1RXmkvWAF4OOUc';
let nextPageToken = ''; // لتخزين رمز الصفحة التالية لترقيم الصفحات

function loadRandomVideo(containerId) {
        var container = document.getElementById(containerId);
        var url = `https://www.googleapis.com/youtube/v3/search?part=snippet&order=date&type=video&videoEmbeddable=true&maxResults=1&key=${apiKey}`;

        fetch(url)
                .then(response => response.json())
                .then(data => {
                        var videoId = data.items[0].id.videoId;

                        var iframe = document.createElement('iframe');
                        iframe.width = '560';
                        iframe.height = '315';
                        iframe.src = `https://www.youtube.com/embed/${videoId}`;
                        iframe.frameBorder = '0';
                        iframe.allowFullscreen = true;

                        container.innerHTML = ''; // مسح الفيديو السابق إن وجد
                        container.appendChild(iframe); // إضافة فيديو جديد
                })
                .catch(error => console.error('Error:', error));
}
const additionalHTM = `
      <div class="poii">
           <img id="profilee" src="ph/14.png" alt="logo">
           <input type="file" id="imgee" accept="image/*" onchange="uploadImage()">
           <pp  ><n id="usernameDisplay" onclick="updateUsername()">Zyphon!</n><svg  class="uname-verified" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1350.03 1326.16">
                                            <defs><style></style></defs>
                              
                                              
                                              <g id="Layer_3" data-name="Layer 3">
                                                  <polygon class="cls-1" points="0 747.37 120.83 569.85 70.11 355.04 283.43 292.38 307.3 107.41 554.93 107.41 693.66 0 862.23 120.83 1072.57 126.8 1112.84 319.23 1293.35 399.79 1256.05 614.6 1350.03 793.61 1197.87 941.29 1202.35 1147.15 969.64 1178.48 868.2 1326.16 675.02 1235.17 493.77 1315.72 354.99 1133.73 165.58 1123.29 152.16 878.64 0 747.37"/></g>
                                              <g id="Layer_2" data-name="Layer 2">
                                                  <path class="cls-12" d="M755.33,979.23s125.85,78.43,165.06,114c34.93-36,234.37-277.22,308.24-331.94,54.71,21.89,85,73.4,93,80.25-3.64,21.89-321.91,418.58-368.42,445.94-32.74-3.84-259-195.16-275.4-217C689.67,1049.45,725.24,1003.85,755.33,979.23Z" transform="translate(-322.83 -335.95)"/></g>
                                          </svg>    
                                                  
                                              </pp>
           <asdd><a>•••</a></asdd>
   </div>
                  `;

const additionalHTML = `<div class="post-content">
                                                <div class="reaction-wrapper">
                                                        <div class="like">
                                                                <label class="container">
                                                                        <input checked="checked" type="checkbox">
                                                                        <div class="checkmark">
                                                                                <svg viewBox="0 0 256 256">
                                                                                        <rect fill="none" height="256" width="256"></rect>
                                                                                        <path class="lok" d="M224.6,51.9a59.5,59.5,0,0,0-43-19.9,60.5,60.5,0,0,0-44,17.6L128,59.1l-7.5-7.4C97.2,28.3,59.2,26.3,35.9,47.4a59.9,59.9,0,0,0-2.3,87l83.1,83.1a15.9,15.9,0,0,0,22.6,0l81-81C243.7,113.2,245.6,75.2,224.6,51.9Z" stroke-width="20px" stroke="#FFF" fill="none"></path>
                                                                                </svg>
                                                                        </div>
                                                                </label>
                                                        </div>
                                                        <a onclick="toggleMen()" class="comment">
                                                                <svg height="24" role="img" viewBox="0 0 48 48" width="24">
                                                                        <path clip-rule="evenodd" d="M47.5 46.1l-2.8-11c1.8-3.3 2.8-7.1 2.8-11.1C47.5 11 37 .5 24 .5S.5 11 .5 24 11 47.5 24 47.5c4 0 7.8-1 11.1-2.8l11 2.8c.8.2 1.6-.6 1.4-1.4zm-3-22.1c0 4-1 7-2.6 10-.2.4-.3.9-.2 1.4l2.1 8.4-8.3-2.1c-.5-.1-1-.1-1.4.2-1.8 1-5.2 2.6-10 2.6-11.4 0-20.6-9.2-20.6-20.5S12.7 3.5 24 3.5 44.5 12.7 44.5 24z" fill-rule="evenodd"></path>
                                                                </svg>
                                                        </a>
                                                        <a  class="transfer">
                                                                <svg height="24" viewBox="0 0 48 48" width="24">
                                                                        <path d="M47.8 3.8c-.3-.5-.8-.8-1.3-.8h-45C.9 3.1.3 3.5.1 4S0 5.2.4 5.7l15.9 15.6 5.5 22.6c.1.6.6 1 1.2 1.1h.2c.5 0 1-.3 1.3-.7l23.2-39c.4-.4.4-1 .1-1.5zM5.2 6.1h35.5L18 18.7 5.2 6.1zm18.7 33.6l-4.4-18.4L42.4 8.6 23.9 39.7z"></path>
                                                                </svg>
                                                        </a>
                                                        <a class="signet">
                                                                <label class="containe">
                                                                        <input type="checkbox" checked="checked">
                                                                        <svg class="save-regular" xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 384 512">
                                                                                <path d="M0 48C0 21.5 21.5 0 48 0l0 48V441.4l130.1-92.9c8.3-6 19.6-6 27.9 0L336 441.4V48H48V0H336c26.5 0 48 21.5 48 48V488c0 9-5 17.2-13 21.3s-17.6 3.4-24.9-1.8L192 397.5 37.9 507.5c-7.3 5.2-16.9 5.9-24.9 1.8S0 497 0 488V48z"></path>
                                                                        </svg>
                                                                        <svg class="save-solid" xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 384 512">
                                                                                <path d="M0 48V487.7C0 501.1 10.9 512 24.3 512c5 0 9.9-1.5 14-4.4L192 400 345.7 507.6c4.1 2.9 9 4.4 14 4.4c13.4 0 24.3-10.9 24.3-24.3V48c0-26.5-21.5-48-48-48H48C21.5 0 0 21.5 0 48z"></path>
                                                                        </svg>
                                                                </label>
                                                        </a>
                                                </div>
                                                         <p  class="post-time">2 minutes ago </p>   
                   
                                       </div>
                                                
             
               
`;
function loadVideos() {
        var container = document.getElementById('player-container');
        var url = `https://www.googleapis.com/youtube/v3/search?part=snippet&order=date&type=video&videoEmbeddable=true&maxResults=5&key=${apiKey}&pageToken=${nextPageToken}`;

        fetch(url)
                .then(response => response.json())
                .then(data => {
                        data.items.forEach(item => {
                                var videoId = item.id.videoId;

                                var iframe = document.createElement('iframe');
                                iframe.width = '560';
                                iframe.height = '315';
                                iframe.src = `https://www.youtube.com/embed/${videoId}`;
                                iframe.frameBorder = '0';
                                iframe.allowFullscreen = true;

     container.innerHTML += additionalHTM;
container.appendChild(iframe);
container.innerHTML += additionalHTML;                           
                                
                        });

                        // تخزين رمز الصفحة التالية للترقيم
                        nextPageToken = data.nextPageToken;

                        // حذف الزر إذا كان موجوداً
                        var loadMoreButton = document.getElementById('loadMoreButton');
                        if (loadMoreButton) {
                                loadMoreButton.remove();
                        }

                        // إضافة الزر في نهاية الفيديوهات
                        var loadMoreButton = document.createElement('button');
                        loadMoreButton.textContent = 'تحميل المزيد';
                        loadMoreButton.id = 'loadMoreButton';
                        loadMoreButton.addEventListener('click', function() {
                                loadVideos();
                                this.style.display = 'none'; // إخفاء الزر بعد النقر
                        });
                        container.appendChild(loadMoreButton);
                })
                .catch(error => console.error('Error:', error));
}

// تحميل الفيديو الأولي
loadRandomVideo('plyer-container');
loadVideos(); // لتحميل الفيديوهات الأولى مباشرة










