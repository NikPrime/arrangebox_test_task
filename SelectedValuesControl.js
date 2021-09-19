import {AvailableValuesControl} from "./AvailableValuesControl.js";

export class SelectedValuesControl extends AvailableValuesControl {
   constructor() {
      super([]);
      this.controlName = 'selected';
      this.id = SelectedValuesControl.incrementId();
   }

   static incrementId() {
      return this.latestSelectedId = !this.latestSelectedId ? 1 : this.latestSelectedId + 1;
   }

   reset() {
      this.valuesList = []
   }
}