# -*- coding: utf-8 -*-
"""
Created on Sun May 24 21:31:26 2020

@author: barosan
"""
import ModeChoice as mc
import OseroGUI

if __name__=="__main__":
    mc=mc.ModeChoice()
    mc.run()
    mc.returnMode()
    modeChoice=mc.returnMode()
    if modeChoice!=-1:
        osero=OseroGUI.Osero()
        osero.run()
        