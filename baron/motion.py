# -*- coding: utf-8 -*-
"""
Created on Sun May 24 21:31:26 2020

@author: barosan
"""
import mode
import gui
import ai

if __name__=="__main__":
    mc=mode.ModeChoice()
    mc.run()
    mode_choice=mc.return_mode()
    if mode_choice!=-1:
        og=gui.OseroGui(mode_choice)
        og.run()