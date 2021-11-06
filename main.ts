function DrawBoard () {
    OLED12864_I2C.init(60)
    OLED12864_I2C.off()
    OLED12864_I2C.rect(
    0,
    0,
    60,
    30,
    1
    )
    OLED12864_I2C.vline(
    10,
    0,
    30,
    1
    )
    OLED12864_I2C.vline(
    20,
    0,
    30,
    1
    )
    OLED12864_I2C.vline(
    30,
    0,
    30,
    1
    )
    OLED12864_I2C.hline(
    0,
    10,
    30,
    1
    )
    OLED12864_I2C.hline(
    0,
    20,
    30,
    1
    )
    OLED12864_I2C.on()
}
input.onButtonPressed(Button.B, function () {
    Move(0, 0)
    PosX += 1
    if (PosX == 3) {
        PosY = 0
    }
    Move(0, 1)
})
function DrawX (X: number, Y: number, C: number) {
    I = 0
    for (let index = 0; index < 8; index++) {
        OLED12864_I2C.pixel(X + I, Y + I, C)
        OLED12864_I2C.pixel(X + I + 10, Y - I, C)
        I += 1
    }
}
function Move (Sel: number, C: number) {
    if (Sel == 0) {
        DrawX(1 + PosX * 10, 1 + PosY * 10, 0)
        DrawX(1 + PosX * 10, 1 + PosY * 10, 1)
    } else {
    	
    }
}
let I = 0
let PosY = 0
let PosX = 0
DrawBoard()
basic.forever(function () {
    basic.pause(1000)
})
