var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Column, Entity, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import User from "./User.js";
let Image = class Image {
    constructor(photo) {
        this.photo = photo;
    }
};
__decorate([
    PrimaryGeneratedColumn(),
    __metadata("design:type", Number)
], Image.prototype, "id", void 0);
__decorate([
    Column(),
    __metadata("design:type", String)
], Image.prototype, "photo", void 0);
__decorate([
    OneToOne(() => User, (user) => user.photo),
    __metadata("design:type", Object)
], Image.prototype, "user", void 0);
Image = __decorate([
    Entity(),
    __metadata("design:paramtypes", [String])
], Image);
export default Image;
