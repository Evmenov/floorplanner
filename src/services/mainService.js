export const authenticationService = {
  getMap,
  saveMap
};

export function getMap(id) {
  const requestOptions = {
    method: 'GET',
    headers: {'Content-Type': 'application/json'}
  };

  return fetch("https://api.rentto.online/floorplanner/get-floor-map/" + id.id, requestOptions)
    .then(_ => {
      return _;
    });
}


export function saveMap(floorId, mes) {
  let message = JSON.stringify(mes);

  console.log(message)
  const requestOptions = {
    method: 'POST',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify({floorId, message})
  };

  return fetch('https://api.rentto.online/floorplanner/save-floor-map', requestOptions)
    .then(res => {
      if (res.ok) {
        alert("Сохранение прошло успешно!");
        // let redirectPath = path.domen + '/company/objects/?curlid={' + id.curlid + '}';
        let redirectPath = "http://localhost:3000/main";
        window.location.href = redirectPath;
      } else {
        alert("Сервер отклонил сохранение. Код ошибки " + res.status);
      }
    }, function (e) {
      alert("Error submitting form!");
    });
}
