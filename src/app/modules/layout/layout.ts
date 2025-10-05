import { CommonModule } from '@angular/common';
import { Component, OnInit, signal } from '@angular/core';
import { Map } from './components/map/map';
import { Notification } from './components/notification/notification';
import { RightSidebar } from './components/right-sidebar/right-sidebar';
import { LeftSidebar } from './components/left-sidebar/left-sidebar';
import { SearchBar } from './components/search-bar/search-bar';
import { Load } from '../../shared/components/load/load';
import { Nasapd } from '../../services/nasa-power-dav/nasapd';
import { MiniGame } from './components/mini-game/mini-game';

@Component({
  selector: 'app-layout',
  imports: [CommonModule, Map,Notification,RightSidebar,LeftSidebar,SearchBar,
    Load,MiniGame
  ],
  templateUrl: './layout.html',
  styleUrl: './layout.scss'
})
export class Layout implements OnInit{

  isLoading = signal<boolean>(true);

  constructor(private _nasaPd:Nasapd){}
  ngOnInit(): void {
    setTimeout(() => {
      this.isLoading.set(false);
    }, 5000);
    this.getidk()
  }

  getidk(){

  }
}
