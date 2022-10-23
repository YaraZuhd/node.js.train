"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrderItems = void 0;
const typeorm_1 = require("typeorm");
const Cart_1 = require("./Cart");
const Order_1 = require("./Order");
let OrderItems = class OrderItems extends typeorm_1.BaseEntity {
    constructor() {
        super(...arguments);
        this.quantity = 0;
    }
};
__decorate([
    (0, typeorm_1.PrimaryColumn)(),
    __metadata("design:type", Number)
], OrderItems.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => Order_1.Order, {
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
        nullable: true,
    }),
    __metadata("design:type", Order_1.Order)
], OrderItems.prototype, "order", void 0);
__decorate([
    (0, typeorm_1.Column)({
        nullable: true
    }),
    __metadata("design:type", Number)
], OrderItems.prototype, "quantity", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => Cart_1.Cart, {
        nullable: true,
    }),
    __metadata("design:type", Cart_1.Cart)
], OrderItems.prototype, "cart", void 0);
OrderItems = __decorate([
    (0, typeorm_1.Entity)()
], OrderItems);
exports.OrderItems = OrderItems;
