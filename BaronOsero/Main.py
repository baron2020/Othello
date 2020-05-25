# -*- coding: utf-8 -*-
"""
Created on Sun May 24 21:31:26 2020

@author: barosan
"""
import ModeChoice
import OseroGUI
import AI

if __name__=="__main__":
    mc=ModeChoice.ModeChoice()
    mc.run()
    mode=mc.returnMode()
    if mode!=-1:
        og=OseroGUI.OseroGUI(mode)
        og.run()
        