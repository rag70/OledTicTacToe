function ShowWhoStarts () {
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
input.onButtonPressed(Button.A, function () {
    if (State < 3) {
        DrawStateMenu(0)
        State += 1
        if (State >= 3) {
            State = 0
        }
        DrawStateMenu(1)
    } else if (State == 3) {
        PlayinAndCheck()
    } else if (State == 5) {
        OLED12864_I2C.invert(false)
        StarGame(true, 1)
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
    ShowWhoStarts()
    OLED12864_I2C.showString(
    7,
    2,
    "Start",
    1
    )
    DrawPlayerChip(false)
    DrawStateMenu(1)
}
function CheckWinner (player: number) {
    for (let index = 0; index <= 7; index++) {
        c = 0
        for (let index2 = 0; index2 <= 2; index2++) {
            if (GameMap[WinerMap[index * 3 + index2]] == player) {
                c += 1
            } else {
                break;
            }
        }
        if (c == 3) {
            return true
        }
    }
    return false
}
function NextBoxForThePlayer () {
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
        } else if (CheckForNotBoxes()) {
            StarGame(false, 1)
            return
        }
    }
    Move(Player, 1)
}
function ConvertPostToIndex (X: number, Y: number) {
    return X + Y * 3
}
function MicrobitMoveTo (index: number) {
    GameMap[index] = 2
    PosX = index % 3
    PosY = Math.floor(index / 3)
    if (Player == 0) {
        Move(1, 1)
    } else {
        Move(0, 1)
    }
}
function StarGame (newGame: boolean, reset: number) {
    if (newGame) {
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
    PosX = 0
    PosY = 0
}
function PlayMicroBit () {
    if (GameMap[1] == 1 && GameMap[2] == 0) {
        MicrobitMoveTo(2)
    } else {
        c = 0
        for (let value of GameMap) {
            if (value == 0) {
                c += 1
            }
        }
        c = randint(0, c - 1)
        for (let index3 = 0; index3 <= GameMap.length; index3++) {
            if (GameMap[index3] == 0) {
                if (c == 0) {
                    MicrobitMoveTo(index3)
                    break;
                }
                c += -1
            }
        }
    }
}
function DrawPlayerChip (change: boolean) {
    if (Player == 0) {
        DrawX(38, 8, 0)
    } else {
        DrawO(37, 8, 0)
    }
    if (change) {
        Player = (Player + 1) % 2
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
function CheckForNotBoxes () {
    for (let value of GameMap) {
        if (value == 0) {
            return false
        }
    }
    return true
}
function Intro () {
    OLED12864_I2C.showString(
    1,
    0,
    "Tic Tac Toe",
    1
    )
    OLED12864_I2C.showString(
    3,
    3,
    "Nov, 2021",
    1
    )
    tx = "By: Roberto Alonso Gomez, for my son Liam Alonso Diaz"
    for (let index = 0; index <= 41; index++) {
        OLED12864_I2C.showString(
        0,
        2,
        tx.substr(index, 12),
        1
        )
        if (index % 2 == 0) {
            OLED12864_I2C.showString(
            3,
            1,
            "GAME",
            1
            )
        } else {
            OLED12864_I2C.showString(
            3,
            1,
            "GAME",
            0
            )
        }
        basic.pause(200)
    }
    basic.pause(1000)
}
input.onButtonPressed(Button.B, function () {
    if (State == 0) {
        WhoBegin += 1
        ShowWhoStarts()
    } else if (State == 1) {
        DrawPlayerChip(true)
    } else if (State == 2) {
        State = 3
        OLED12864_I2C.showString(
        7,
        2,
        "     ",
        1
        )
        if (WhoBegin == 1) {
            PlayMicroBit()
            PosX = 3
            PosY = 3
            NextBoxForThePlayer()
        }
    } else if (State == 3) {
        NextBoxForThePlayer()
    } else if (State == 5) {
        OLED12864_I2C.invert(false)
        StarGame(true, 1)
        OLED12864_I2C.showString(
        7,
        2,
        "     ",
        1
        )
        State = 3
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
    for (let index4 = 0; index4 <= 6; index4++) {
        OLED12864_I2C.pixel(X + index4, Y + index4, C)
        OLED12864_I2C.pixel(X - index4 + 6, Y + index4, C)
    }
}
function Move (Sel: number, C: number) {
    if (Sel == 0) {
        DrawX(2 + PosX * 10, 2 + PosY * 10, C)
    } else {
        DrawO(1 + PosX * 10, 1 + PosY * 10, C)
    }
}
function ShowWinner (text: string, win: number, lost: number) {
    OLED12864_I2C.clear()
    OLED12864_I2C.invert(true)
    OLED12864_I2C.showString(
    1,
    0,
    text,
    1
    )
    OLED12864_I2C.showString(
    2,
    1,
    "WIN = " + win,
    1
    )
    OLED12864_I2C.showString(
    1,
    2,
    "Lost = " + lost,
    1
    )
    OLED12864_I2C.showString(
    0,
    3,
    "A-*  B->>",
    1
    )
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
function PlayinAndCheck () {
    State = 4
    basic.pause(200)
    Move(Player, 1)
    GameMap[ConvertPostToIndex(PosX, PosY)] = 1
    if (CheckWinner(1)) {
        YouWin += 1
        basic.showIcon(IconNames.Heart)
        State = 5
        basic.pause(2000)
        ShowWinner("You !!", YouWin, MBitWin)
        return
    }
    PlayMicroBit()
    if (CheckWinner(2)) {
        MBitWin += 1
        basic.showIcon(IconNames.No)
        State = 5
        basic.pause(3000)
        ShowWinner("MicroBit", MBitWin, YouWin)
        return
    }
    PosX = 3
    PosY = 3
    NextBoxForThePlayer()
    State = 3
}
let MBitWin = 0
let YouWin = 0
let I = 0
let tx = ""
let PosY = 0
let PosX = 0
let Player = 0
let GameMap: number[] = []
let c = 0
let State = 0
let WhoBegin = 0
let WinerMap: number[] = []
OLED12864_I2C.init(60)
Intro()
StarGame(false, 1)
WinerMap = [
0,
1,
2,
3,
4,
5,
6,
7,
8,
0,
3,
6,
1,
4,
7,
2,
5,
8,
0,
4,
8,
2,
4,
6
]
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
