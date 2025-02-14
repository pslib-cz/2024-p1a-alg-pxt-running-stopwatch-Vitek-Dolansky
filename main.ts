radio.setGroup(73)

enum State { Ready, Running, Finnish }
let akce = State.Ready
Sensors.SetLightLevel()

Sensors.OnLightDrop(function () {
    if (akce === State.Ready) {
        radio.sendNumber(1) // konec = 2, start = 1
        akce = State.Running
    }

})

//radio.onReceivedNumber(function(receivedNumber: number) {
// whaleysans.showNumber(input.runningTime())
//})


radio.onReceivedValue(function (name: string, value: number) {
    music.playTone(440, 500)

    if (name === "endTime" && akce === State.Running) {
        basic.showNumber(value)
        music.play(music.tonePlayable(Note.C, music.beat(BeatFraction.Whole)), music.PlaybackMode.UntilDone)
        akce = State.Finnish
    }

    if (akce === State.Finnish) {
        akce = State.Ready
    }
})



