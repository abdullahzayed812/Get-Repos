let inputText = document.querySelector('input');
let getButton = document.querySelector('button');
let showData = document.querySelector('.show-data');

getButton.onclick = function () {
    getRepos();
}

function getRepos() {
    if (!inputText.value) {
        showData.innerHTML = "<span>Must Add Github User Name</span>";
    } else {
        showData.firstChild.remove();
        let xtr = new XMLHttpRequest();
        let url = `https://api.github.com/users/${inputText.value}/repos`;
        let method = 'GET';
        xtr.onreadystatechange = function () {
            if (this.readyState === 4 && this.status === 200) {
                let responseJson = JSON.parse(this.responseText);
                for (let i = 0; i < responseJson.length; i += 1) {
                    let mainDiv = document.createElement('div');
                    let divText = document.createTextNode(`${responseJson[i].name}`);
                    let url = document.createElement('a');
                    let forksSpan = document.createElement('span');
                    forksSpan.appendChild(document.createTextNode(responseJson[i].forks));
                    url.href = responseJson[i].html_url;
                    url.setAttribute('target', '_blank')
                    url.className = "project-link";
                    url.appendChild(document.createTextNode("Vist"))
                    mainDiv.appendChild(forksSpan);
                    mainDiv.appendChild(divText);
                    mainDiv.className = "main-div";
                    mainDiv.appendChild(url);
                    

                    showData.appendChild(mainDiv);
                }
            }
        }
        xtr.open(method, url, true);
        xtr.send();
    }
}