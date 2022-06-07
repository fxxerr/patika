const taskDOM = document.querySelector("#task"); // text inputa erişmek için DOM ataması
const listDOM = document.querySelector("#list"); // Liste bloğuna erimek için DOM ataması

///Görev Ekleme Fonksiyonu

////html yapısının içerisinde Butona basar basmaz fonksiyonu çalıtırıyor. Bu yüzden burada herhangi bir query slector ya da Eventlistenerla dinlememize gerek yok.
const addTask = () => {
  /////////////////  Bu yapı içinde Listeye yeni madde eklenirken listede olan aynı maddenin eklenmesinin önüne geçiliyor
  let duplicate = true;
  for (let i = 0; i < listDOM.children.length; i++) {
    if (
      listDOM.children.item(i).firstChild.textContent.trim() == taskDOM.value
    ) {
      duplicate = false;
      break;
    }
  }
  /////////////

  /////Burada Liseye boşluk ya da herhangi gitiş olmaması durumunda toast uyarısı verdiyoruz. trim() fonsiyonu
  //// Boşluğu otomatik sildiği için 2 ayrı sorgudan kurtarıp boşluk ve boş ifadeyi eşitliyor.

  if (taskDOM.value.trim() == "") {
    $(".toast").toast("show");
  }

  ///////////////////////////////////

  ///////////////Buradada duplicae olmaması ve girdi olması durumunda liseye ekleme yapılıyor.

  if (taskDOM.value.trim() && duplicate == true) {
    let gorev = taskDOM.value;
    let liDOM = document.createElement("li");
    liDOM.innerHTML = `${gorev}<span class="close">×</span>`;
    listDOM.append(liDOM);
  }
};

///Click eventini referans alarak eventin uygulandığı bloğun üzerinde işlem yapıyor.

listDOM.addEventListener("click", function (event) {
  if (event.target.parentNode.nodeName == "LI") {
    ///Eğer tıklanan yerdeki Parentnode li ise yani span etiketi li nin childnode u eğer bir üstü li ise burayı sil diyor.
    ///Böylece span a yerleştirilen X le kapama işlevi elde ediliyor.
    event.target.parentNode.remove();
  } else if (
    event.target.nodeName == "LI" &&
    event.target.style.textDecoration == "" //Burada hedef node li ise ve yazı çizili değilse çiz ve arkaplan rengi ekle diyor.
  ) {
    event.target.style.textDecoration = "line-through";
    event.target.style.backgroundColor = "darkgrey";
  } else if (
    event.target.nodeName == "LI" &&
    event.target.style.textDecoration == "line-through" &&
    event.target.style.backgroundColor == "darkgrey" ///Burada da hedef node li ise ve text decore ve backround varsa bunlar kaldırılıyor.
  ) {
    event.target.style.textDecoration = "";
    event.target.style.backgroundColor = "";
  }
});
