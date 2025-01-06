
radio.setGroup(73)

Sensors.SetLightLevel()
input.onButtonPressed(Button.A, function() {
    Sensors.SetLightLevel()
})

let start: boolean = false

Sensors.OnLightDrop(function() {
    if (start === false) {
        radio.sendValue ("konec", 2) // konec = 2, zrušeno = 0
    }
})

radio.onReceivedValue


















