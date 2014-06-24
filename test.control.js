/**
 * Created by V052207 on 2014-06-24.
 */
loadAPI(1);

host.defineController("Generic", "BitwigLiveMixer", "1.0", "e6fab2e0-5f2e-11e2-bcfd-0800200c9a66");
host.defineMidiPorts(1, 1);
host.addDeviceNameBasedDiscoveryPair(["BCF2000"], ["BCF2000"]);
host.addDeviceNameBasedDiscoveryPair(["BCF2000 port 1"], ["BCF2000 port 1"]);
host.addDeviceNameBasedDiscoveryPair(["BCF2000 port 2"], ["BCF2000 port 2"]);
host.addDeviceNameBasedDiscoveryPair(["BCF2000 port 3"], ["BCF2000 port 3"]);
host.addDeviceNameBasedDiscoveryPair(["BCF2000 Port 1"], ["BCF2000 Port 1"]);
host.addDeviceNameBasedDiscoveryPair(["BCF2000 Port 2"], ["BCF2000 Port 2"]);

for ( var i = 1; i < 9; i++)
{
  var name = i.toString() + "- BCF2000";
  host.addDeviceNameBasedDiscoveryPair([name], [name]);
  host.addDeviceNameBasedDiscoveryPair(["BCF2000 MIDI " + i.toString()], ["BCF2000 MIDI " + i.toString()]);
}

var CC =
{
  CLICKENC0 : 8,
  FADER0 : 81
};



function init()
{

  host.getMidiInPort(0).setMidiCallback(onMidi);

  application = host.createApplicationSection();
  trackBank = host.createTrackBankSection(8, 5, 0);

  // //////////////////////////////////////////* TRACK BANK */

  var track = trackBank.getTrack(1);

  println("hej");
  println(track);
}

function onMidi(status, data1, data2)
{
  printMidi(status, data1, data2);
  println("New");



  var trackVolume = trackBank.getTrack(1).getVolume();

  trackVolume.set(data2, 128);
}

