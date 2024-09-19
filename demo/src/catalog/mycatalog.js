import { Catalog } from "react-planner";

let catalog = new Catalog();

let iconDoor = require("../../../public/images/doors.png");
let iconTexture = require("../../../public/images/texture.png");
let iconLivingRoom = require("../../../public/images/iconPK.png");
let iconBedRoom = require("../../../public/images/iconPN.png");
let iconKitchen = require("../../../public/images/iconKitchen.png");
let iconBathRoom = require("../../../public/images/iconBathroom.png");
let iconWorship = require("../../../public/images/iconWorship.png");
let iconOutside = require("../../../public/images/iconOutside.png");
let iconOffice = require("../../../public/images/iconOffice.png");
let iconStair = require("../../../public/images/iconStair.png");

import * as Areas from "./areas/**/planner-element.jsx";
import * as Lines from "./lines/**/planner-element.jsx";
import * as Holes from "./holes/**/planner-element.jsx";
import * as Items from "./items/**/planner-element.jsx";
import * as Textures from "./textures/**/planner-element.jsx";

for (let x in Areas) catalog.registerElement(Areas[x]);
for (let x in Lines) catalog.registerElement(Lines[x]);
for (let x in Holes) catalog.registerElement(Holes[x]);
for (let x in Items) catalog.registerElement(Items[x]);
for (let x in Textures) catalog.registerElement(Textures[x]);
catalog.registerCategory("texture", "Texture", iconTexture, [
  Textures.lFrame,
  Textures.square,
  Textures.tFrame,
  Textures.thapFrame,
  Textures.uFrame,
  Lines.wall,
  Holes.gate,
]);
catalog.registerCategory("windows", "Windows", iconDoor, [
  Holes.window,
  Holes.sashWindow,
  Holes.venetianBlindWindow,
  Holes.windowCurtain,
]);
catalog.registerCategory("doors", "Doors", iconDoor, [
  Holes.door,
  Holes.doorDouble,
  Holes.panicDoor,
  Holes.panicDoorDouble,
  Holes.slidingDoor,
]);
catalog.registerCategory("livingroom", "LivingRoom", iconLivingRoom, [
  Textures.lFrame,
  Textures.square,
  Textures.tFrame,
  Textures.thapFrame,
  Textures.uFrame,
  Lines.wall,
  Holes.gate,
]);
catalog.registerCategory("bedroom", "BedRoom", iconBedRoom, [
  Textures.lFrame,
  Textures.square,
  Textures.tFrame,
  Textures.thapFrame,
  Textures.uFrame,
  Lines.wall,
  Holes.gate,
]);
catalog.registerCategory("kitchen", "Kitchen", iconKitchen, [
  Textures.lFrame,
  Textures.square,
  Textures.tFrame,
  Textures.thapFrame,
  Textures.uFrame,
  Lines.wall,
  Holes.gate,
]);
catalog.registerCategory("bathroom", "BathRoom", iconBathRoom, [
  Textures.lFrame,
  Textures.square,
  Textures.tFrame,
  Textures.thapFrame,
  Textures.uFrame,
  Lines.wall,
  Holes.gate,
]);
catalog.registerCategory("worship", "Worship", iconWorship, [
  Textures.lFrame,
  Textures.square,
  Textures.tFrame,
  Textures.thapFrame,
  Textures.uFrame,
  Lines.wall,
  Holes.gate,
]);
catalog.registerCategory("outside", "OutSide", iconOutside, [
  Textures.lFrame,
  Textures.square,
  Textures.tFrame,
  Textures.thapFrame,
  Textures.uFrame,
  Lines.wall,
  Holes.gate,
]);
catalog.registerCategory("office", "Office", iconOffice, [
  Textures.lFrame,
  Textures.square,
  Textures.tFrame,
  Textures.thapFrame,
  Textures.uFrame,
  Lines.wall,
  Holes.gate,
]);
catalog.registerCategory("stair", "Stair", iconStair, [
  Textures.lFrame,
  Textures.square,
  Textures.tFrame,
  Textures.thapFrame,
  Textures.uFrame,
  Lines.wall,
  Holes.gate,
]);

export default catalog;
