import mode
import gui

if __name__=="__main__":
    mc=mode.ModeChoice()
    mc.run()
    mode_choice=mc.return_mode()
    if mode_choice!=-1:
        og=gui.OtelloGui(mode_choice)
        og.run()