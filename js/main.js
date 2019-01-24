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
    card.setAttribute("ondragend", "cardDragEnd(event)")
    card.style.setProperty("background-image", `url(assets/${key}/${key}_${cardNum}.jpg)`);
    card.style.setProperty("height", `${swCardInfo.height}px`);
    card.style.setProperty("width", `${swCardInfo.width}px`);
    card.style.setProperty("margin-bottom", `-${swCardInfo.height * 0.8}px`);
    document.getElementById("unused").appendChild(card);
  }
}

function moveDragImage(event)
{
  let dragImageElement = document.getElementById("drag-image");
  if (!dragImageElement || dragImageElement.classList.contains("invisible")) return;
  // todo: assumptions
  dragImageElement.style.setProperty("top", event.pageY - 100 + "px");
  dragImageElement.style.setProperty("left", event.pageX -200 + "px");

}

function cardDragged(event)
{
  let dragImage = document.getElementById("drag-image");
  if (dragImage)
  {
      //todo: assumptions
      console.dir(event);
      dragImage.style.setProperty("top", event.pageY - 100 + "px");
      dragImage.style.setProperty("left", event.pageX -200 + "px");
      dragImage.classList.remove("invisible");
      dragImage.appendChild(event.target.cloneNode(false));
  }

  event.target.classList.add("dragging");
  event.dataTransfer.setData("text/plain", event.target.id);
  event.dataTransfer.dropEffect = "move";

  let img = new Image();
  event.dataTransfer.setDragImage(img, 0, 0)
}

function cardDragEnd(event)
{
  event.target.classList.remove("dragging");
  let dragImage = document.getElementById("drag-image");
  if (dragImage)
  {
    dragImage.classList.add("invisible");
    dragImage.firstChild.remove();
  }
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
