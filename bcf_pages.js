//////////////////////////////////////////////////////////////////////////////////////////////  BCF_Pages


function EncoderPage(page)
{
	this.ledBuffer = [0,8];
	for ( var i = 0; i < 8; i++)
	{
		this.ledBuffer[i] = 0;
	}
	this.page = page;

}

EncoderPage.prototype.sendEncoderToBControl = function(enc)
{
	if (bcfActiveEncoderPage != this.page) return;
	var buffer = this.ledBuffer[enc];
	sendChannelController(0, (CC.CLICKENC0 + enc), buffer);
};

EncoderPage.prototype.sendAllEncodersToBControl = function()
{
	for ( var i = 0; i < 8; i++)
	{
		this.sendEncoderToBControl(i);
	}
};

EncoderPage.prototype.setEncoder = function(col, value)
{
	var v = (Math.round(value));
	this.ledBuffer[col] = value;
	this.sendEncoderToBControl(col);
};

function setBcfEncoderPage(page)
{
	bcfActiveEncoderPage = page;
	encoderPages[page].sendAllEncodersToBControl();
}

function setIndications(page)
{
	switch (page)
	{
		case "pan":
			for ( var i = 0; i < 8; i++)
			{
				var track = trackBank.getTrack(i);
//				var parameter = cursorDevice.getParameter(i);
				var macro = primaryInstrument.getMacro(i).getAmount();
				track.getPan().setIndication(true);
				track.getSend(bcfActiveSendPage - 1).setIndication(false);
				macro.setIndication(false);
			}
			break;
		case "send":
			for ( var i = 0; i < 8; i++)
			{
				var track = trackBank.getTrack(i);
//				var parameter = cursorDevice.getParameter(i);
				var macro = primaryInstrument.getMacro(i).getAmount();
				track.getPan().setIndication(false);
				macro.setIndication(false);

				for ( var s = 0; s < numSendPages; s++)
				{
					track.getSend(s).setIndication(false);
				}
				track.getSend(bcfActiveSendPage - 1).setIndication(true);
			}
			break;
		case "device":
			for ( var i = 0; i < 8; i++)
			{
				var track = trackBank.getTrack(i);
//				var parameter = cursorDevice.getParameter(i);
				var macro = primaryInstrument.getMacro(i).getAmount();

				macro.setIndication(true);
				track.getPan().setIndication(false);
				track.getSend(bcfActiveSendPage - 1).setIndication(false);
			}
			break;
		case "off":
			for ( var i = 0; i < 8; i++)
			{
				var track = trackBank.getTrack(i);
//				var parameter = cursorDevice.getParameter(i);
				var macro = primaryInstrument.getMacro(i).getAmount();
				macro.setIndication(false);
				track.getPan().setIndication(false);
				track.getSend(bcfActiveSendPage - 1).setIndication(false);
			}
			break;
	}
}
function switchActiveSendPage(d)
{
	if (d == "prev")
	{
		if (bcfActiveSendPage > ENCODER_PAGE.SEND0)
		{
			bcfActiveSendPage -= 1;
			setBcfEncoderPage(bcfActiveSendPage);
		}
		else
		{
			bcfActiveSendPage = numSendPages;
			setBcfEncoderPage(bcfActiveSendPage);
		}
	}
	if (d == "next")
	{
		if (bcfActiveSendPage < numSendPages - 1)
			bcfActiveSendPage += 1;
		else bcfActiveSendPage = ENCODER_PAGE.SEND0;
	}
}
function flipPage(direction)
{
	switch (bcfActiveEncoderPage)
	{
		case ENCODER_PAGE.DEVICE:
			if (direction == "prev")
			{
				isShift ? cursorDevice.switchToPreviousPresetCategory() : cursorDevice.switchToPreviousPreset();
			}
			else if (direction == "next")
			{
				isShift ? cursorDevice.switchToNextPresetCategory() : cursorDevice.switchToNextPreset();
			}
			break;
	}
	if (bcfActiveEncoderPage == ENCODER_PAGE.SEND0 || bcfActiveEncoderPage == ENCODER_PAGE.SEND1 || bcfActiveEncoderPage == ENCODER_PAGE.SEND2 || bcfActiveEncoderPage == ENCODER_PAGE.SEND3 || bcfActiveEncoderPage == ENCODER_PAGE.SEND4)
	{
		if (direction == "prev")
		{
			switchActiveSendPage("prev");
			setBcfEncoderPage(bcfActiveSendPage);
			setIndications("send");
		}
		else if (direction == "next")
		{
			switchActiveSendPage("next");
			setBcfEncoderPage(bcfActiveSendPage);
			setIndications("send");
		}
	}
	// break;
	// }
}
