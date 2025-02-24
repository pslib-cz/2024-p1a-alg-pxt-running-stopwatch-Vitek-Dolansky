radio.setGroup(73)
enum State { Ready, Running, Finnish }
let lastTime: number;
let akce: State;
const reset = () => {
    lastTime = 0
    akce = State.Ready
    Sensors.SetLightLevel()
}
reset()

Sensors.OnLightDrop(function () {
    if (akce === State.Ready) {
        radio.sendNumber(1) // start
        akce = State.Running
    }
})

radio.onReceivedValue(function (name: string, value: number) {
    music.playTone(440, 500)

    if (name === "endTime" && akce === State.Running) {
        lastTime = value
        basic.showNumber(lastTime)
        music.play(music.tonePlayable(Note.C, music.beat(BeatFraction.Whole)), music.PlaybackMode.UntilDone)
        akce = State.Finnish
    }
})
input.onButtonPressed(Button.A, function() {
    if (akce === State.Finnish) {
   basic.showNumber(lastTime)
}
})

input.onButtonPressed(Button.B, function() {
    radio.sendNumber(2)
    reset();
})

radio.onReceivedNumber(function (receivedNumber: number) {
    if (receivedNumber === 0) {
        //radio.sendNumber(0)
        reset();
    }
})