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
  Items.airConditioner,
  Items.camera,
  Items.sofa,
  Items.tv,
  Items.table,
  Items.routerWifi,
  Items.umbrellaStand,
  Items.chair,
]);
catalog.registerCategory("bedroom", "BedRoom", iconBedRoom, [
  Items.wardrobe,
  Items.bookcase,
  Items.airConditioner,
  Items.sink,
  Items.hanger,
  Items.chairdesk,
  Items.table,
  Items.monitorPc,
]);
catalog.registerCategory("kitchen", "Kitchen", iconKitchen, [
  Items.kitchen,
  Items.table,
  Items.fridge,
  Items.sink,
  Items.camera,
]);
// catalog.registerCategory("bathroom", "BathRoom", iconBathRoom, []);
// catalog.registerCategory("worship", "Worship", iconWorship, []);
// catalog.registerCategory("outside", "OutSide", iconOutside, []);
catalog.registerCategory("office", "Office", iconOffice, [
  Items.chairdesk,
  Items.deskoffice,
  Items.monitorPc,
  Items.table,

]);
// catalog.registerCategory("stair", "Stair", iconStair, []);

export default catalog;
