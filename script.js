function loadAllData(){
  const url = "https://www.thesportsdb.com/api/v1/json/1/all_sports.php";
  
}


document.getElementById("search-btn").addEventListener("click", function () {
  const inputFeild = document.getElementById("search-input-feild").value;
  const url = `https://www.thesportsdb.com/api/v1/json/1/searchteams.php?t=${inputFeild}`;
    fetch(url)
    .then((response) => response.json())
    .then((data) => displayTeams(data.teams[0]));
    document.getElementById("invalid-msg").innerText = "";
  document.getElementById("search-input-feild").value = "";
  document.getElementsByTagName("header").textContent = "";
  document.getElementById("see-details").textContent = "";
});

function displayTeams(data) {
  document.getElementById("teams").textContent = "";

  const teams = document.getElementById("teams");
  const div = document.createElement("div");
  div.classList.add("col");
  div.innerHTML = `
  <h2 class="text-center">Teams</h2>
          <div onclick="loadTeamDetails(${data.idTeam})" class="card border-0" style="text-align: center;">
            <img src="${data.strTeamBadge}" class="mx-auto w-50 card-img-top" alt="...">
            <div class="card-body">
              <h5 class="card-title">${data.strTeam}</h5>
              <p class="card-text">${data.strCountry}</p>
            </div>
          </div>
  `;
  teams.appendChild(div);
}

function loadTeamDetails(teamId) {
  const url = `https://www.thesportsdb.com/api/v1/json/1/lookupteam.php?id=${teamId}`;
  fetch(url)
    .then((response) => response.json())
    .then((data) => displayTeamDetails(data.teams[0]));
}

function displayTeamDetails(data) {
  const detailsBox = document.getElementById("see-details");
  const div = document.createElement("div");
  div.classList.add("d-md-flex", "d-block");
  div.innerHTML = `
        <div class="left-side">
          <img class="img-fluid" src="${data.strTeamBadge}" alt="">
          <br><br>
          <h3>Established ${data.intFormedYear}</h3>
          <h3>${data.strCountry}</h3>
          <br>
          <img class="img-fluid" src="${data.strTeamJersey}" alt="">
        </div>
        <div class="right-side">
          <img class="img-fluid" src="${data.strTeamLogo}" alt="">
          <p>${data.strDescriptionEN}</p><br>
          <h3>${data.strStadium}</h3>
          <h5>${data.strStadiumLocation}</h5><br>
          <img class="img-fluid" src="${data.strStadiumThumb}" alt="">
          <p>${data.strStadiumDescription}</p><br>
          <div style="text-align: center;">
          <a target="_blank" style="font-size: 30px;color:black;padding:5px;" href="https://${data.strTwitter}"><i class="fab fa-twitter"></i></a>
          <a target="_blank" style="font-size: 30px;color:black;padding:5px;" href="https://${data.strInstagram}"><i class="fab fa-instagram"></i></a>
          </div>
        </div>
        <br><br>
  `;
  detailsBox.appendChild(div);
}
