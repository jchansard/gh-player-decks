function main(cardInfo)
{
  let key = "sw"
  let swCardInfo = cardInfo[key];
  let cards = [];

  for (let index = 0; index < swCardInfo.numCards; index++)
  {
    let card = document.createElement("div");
    let cardNum = ("00" + index).slice(-2);
    card.id = `${key}-${cardNum}`;
    card.classList.add("ability-card");
    card.setAttribute("draggable", "true");
    card.setAttribute("ondragstart", "cardDragged(event)");
    card.setAttribute("ondragend", "cardDropped(event)")
    card.style.setProperty("background-image", `url(assets/${key}/${key}_${cardNum}.jpg)`);
    card.style.setProperty("height", `${swCardInfo.height}px`);
    card.style.setProperty("width", `${swCardInfo.width}px`);
    card.style.setProperty("margin-bottom", `-${swCardInfo.height * 0.8}px`);
    document.getElementById("unused").appendChild(card);
  }
}

function cardDragged(event)
{
  event.target.classList.add("dragging");
  event.dataTransfer.setData("text/plain", event.target.id);
  event.dataTransfer.dropEffect = "move";

  let img = new Image();
  // todo: assumptions
  img.src = `assets/sw/${event.target.id.replace("-","_")}.jpg`;
  event.dataTransfer.setDragImage(img, 200, 275)
}

function cardDropped(event)
{
  event.target.classList.remove("dragging");
}

function dropped(event)
{
  event.preventDefault();
  let card = document.getElementById(event.dataTransfer.getData("text/plain"))
  event.target.closest(".card-pile").appendChild(card);
}

function dragover_handler(event)
{
  console.log("dragged over");
  event.preventDefault();
}

document.addEventListener("DOMContentLoaded", () => main(CardInfo));
