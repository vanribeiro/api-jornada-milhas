var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";
import Testimonial from "./Testimonial.js";
let User = class User {
    constructor(name, image) {
        this.name = name;
        this.image = image;
    }
};
__decorate([
    PrimaryGeneratedColumn(),
    __metadata("design:type", Number)
], User.prototype, "id", void 0);
__decorate([
    Column("text"),
    __metadata("design:type", String)
], User.prototype, "name", void 0);
__decorate([
    Column("text"),
    __metadata("design:type", String)
], User.prototype, "image", void 0);
__decorate([
    OneToMany(() => Testimonial, (testimonial) => testimonial.user),
    __metadata("design:type", Array)
], User.prototype, "testemonials", void 0);
User = __decorate([
    Entity(),
    __metadata("design:paramtypes", [String, String])
], User);
export default User;
