input.onButtonPressed(Button.A, function () {
    if (State < 3) {
        DrawStateMenu(0)
        State += 1
        if (State >= 3) {
            State = 0
        }
        DrawStateMenu(1)
    } else if (State == 3) {
        State = 4
        basic.pause(200)
        Move(Player, 1)
        GameMap[ConvertPostToIndex(PosX, PosY)] = 1
        PlayMicroBit()
        PosX = 3
        PosY = 3
        PlayerNext()
        State = 3
    }
})
function DrawBoard () {
    OLED12864_I2C.clear()
    OLED12864_I2C.rect(
    0,
    0,
    30,
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
    UiWhoBegin()
    OLED12864_I2C.showString(
    7,
    2,
    "Start",
    1
    )
    DrawPlayerChip()
    DrawStateMenu(1)
}
function CheckWinner () {
	
}
function ConvertPostToIndex (X: number, Y: number) {
    return X + Y * 3
}
function PlayerNext () {
    Move(Player, 0)
    while (true) {
        PosX += 1
        if (PosX >= 3) {
            PosX = 0
            PosY += 1
            if (PosY >= 3) {
                PosY = 0
            }
        }
        if (GameMap[ConvertPostToIndex(PosX, PosY)] == 0) {
            break;
        } else if (MapIsFull()) {
            StarGame(true, 1)
            return
        }
    }
    Move(Player, 1)
}
function StarGame (newGame: boolean, reset: number) {
    if (true) {
        State = 2
        basic.pause(200)
    }
    DrawBoard()
    GameMap = [
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0
    ]
}
function PlayMicroBit () {
    c = 0
    for (let index = 0; index <= 8; index++) {
        if (GameMap[index] == 0) {
            c += 1
        }
    }
    c = randint(0, c - 1)
    basic.showNumber(c)
    for (let index = 0; index <= 8; index++) {
        if (GameMap[index] == 0) {
            if (c == 0) {
                GameMap[index] = 2
                PosX = index % 3
                PosY = Math.round(index / 3)
                if (Player == 0) {
                    Move(1, 1)
                } else {
                    Move(0, 1)
                }
                break;
            }
            c += -1
        }
    }
}
function DrawPlayerChip () {
    if (Player == 0) {
        DrawX(38, 8, 0)
    } else {
        DrawO(37, 8, 0)
    }
    Player += 1
    if (Player >= 2) {
        Player = 0
    }
    if (Player == 0) {
        DrawX(38, 8, 1)
    } else {
        DrawO(37, 8, 1)
    }
}
input.onButtonPressed(Button.AB, function () {
    if (State == 3) {
        StarGame(true, 1)
    }
})
function MapIsFull () {
    for (let index = 0; index <= 8; index++) {
        if (GameMap[index] == 0) {
            return false
        }
    }
    return true
}
input.onButtonPressed(Button.B, function () {
    if (State == 0) {
        WhoBegin += 1
        UiWhoBegin()
    } else if (State == 1) {
        DrawPlayerChip()
    } else if (State == 2) {
        State += 1
        OLED12864_I2C.showString(
        7,
        2,
        "     ",
        1
        )
    } else {
        PlayerNext()
    }
})
function DrawO (X: number, Y: number, C: number) {
    I = 0
    OLED12864_I2C.rect(
    X + 2,
    Y + 2,
    X + 6,
    Y + 6,
    C
    )
    OLED12864_I2C.rect(
    X + 3,
    Y + 3,
    X + 5,
    Y + 5,
    C
    )
}
function DrawX (X: number, Y: number, C: number) {
    for (let index = 0; index <= 6; index++) {
        OLED12864_I2C.pixel(X + index, Y + index, C)
        OLED12864_I2C.pixel(X - index + 6, Y + index, C)
    }
}
function Move (Sel: number, C: number) {
    if (Sel == 0) {
        DrawX(2 + PosX * 10, 2 + PosY * 10, C)
    } else {
        DrawO(1 + PosX * 10, 1 + PosY * 10, C)
    }
}
function DrawStateMenu (C: number) {
    OLED12864_I2C.rect(
    32,
    1 + State * 8,
    33,
    6 + State * 8,
    C
    )
}
function UiWhoBegin () {
    if (WhoBegin >= 2) {
        WhoBegin = 0
    }
    if (WhoBegin == 0) {
        OLED12864_I2C.showString(
        8,
        0,
        "Plyr",
        1
        )
    } else {
        OLED12864_I2C.showString(
        8,
        0,
        "MBit",
        1
        )
    }
}
let I = 0
let WhoBegin = 0
let c = 0
let PosY = 0
let PosX = 0
let GameMap: number[] = []
let Player = 0
let State = 0
OLED12864_I2C.init(60)
StarGame(true, 1)
DrawBoard()
basic.forever(function () {
    if (State == 3) {
        Move(Player, 1)
        OLED12864_I2C.showString(
        8,
        2,
        "---",
        1
        )
        basic.pause(500)
        if (State == 3) {
            OLED12864_I2C.showString(
            8,
            2,
            "+++",
            1
            )
            Move(Player, 0)
            basic.pause(200)
        }
    }
})
