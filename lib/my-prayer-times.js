'use babel';

import MyPrayerTimesView from './my-prayer-times-view';
import { CompositeDisposable } from 'atom';

export default {

  myPrayerTimesView: null,
  modalPanel: null,
  subscriptions: null,

  activate(state) {
    this.myPrayerTimesView = new MyPrayerTimesView(state.myPrayerTimesViewState);
    this.modalPanel = atom.workspace.addModalPanel({
      item: this.myPrayerTimesView.getElement(),
      visible: false
    });

    // Events subscribed to in atom's system can be easily cleaned up with a CompositeDisposable
    this.subscriptions = new CompositeDisposable();

    // Register command that toggles this view
    this.subscriptions.add(atom.commands.add('atom-workspace', {
      'my-prayer-times:toggle': () => this.toggle()
    }));
  },

  deactivate() {
    this.modalPanel.destroy();
    this.subscriptions.dispose();
    this.myPrayerTimesView.destroy();
  },

  serialize() {
    return {
      myPrayerTimesViewState: this.myPrayerTimesView.serialize()
    };
  },

  toggle() {
    console.log('MyPrayerTimes was toggled!');
    return (
      this.modalPanel.isVisible() ?
      this.modalPanel.hide() :
      this.modalPanel.show()
    );
  }

};
