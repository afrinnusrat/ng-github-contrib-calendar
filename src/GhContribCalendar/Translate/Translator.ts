import {Injectable} from '@angular/core';
import {englishTranslations} from './defaultTranslations/en';
import {ContributionCountElement, ContributionCountElement as cce} from './types/ContributionCountElement';
import {ContributionCountOrder} from './types/ContributionCountOrder';
import {Translation} from './types/Translation';
import {Translations} from './types/Translations';
import {TranslationSpec} from './types/TranslationSpec';

function calculateOrder(input: ContributionCountOrder): ReadonlyArray<ContributionCountElement> {
  switch (input) {
    case ContributionCountOrder.DATE_TEXT_COUNT:
      return [cce.DATE, cce.TEXT, cce.COUNT];
    case ContributionCountOrder.COUNT_DATE_TEXT:
      return [cce.COUNT, cce.DATE, cce.TEXT];
    case ContributionCountOrder.TEXT_COUNT_DATE:
      return [cce.TEXT, cce.COUNT, cce.DATE];
    case ContributionCountOrder.TEXT_DATE_COUNT:
      return [cce.TEXT, cce.COUNT, cce.DATE];
    case ContributionCountOrder.DATE_COUNT_TEXT:
      return [cce.DATE, cce.COUNT, cce.TEXT];
    default:
      return [cce.COUNT, cce.TEXT, cce.DATE];
  }
}

let previousRegistration: Partial<TranslationSpec>;

@Injectable()
export class Translator {

  public order: ReadonlyArray<ContributionCountElement>;

  private result: TranslationSpec;

  public constructor() {
    this.registerTranslations(englishTranslations);
  }

  public get hideZero(): boolean {
    return this.result.hideZero;
  }

  public registerTranslations(tr: Partial<TranslationSpec>) {
    if (tr !== previousRegistration) {
      previousRegistration = tr;
      this.result          = Object.assign({}, englishTranslations, tr || {});
      this.order           = calculateOrder(this.result.order);
      Object.freeze(this.order);
    }
  }

  public translate(key: keyof Translations, qty?: number): string {
    const tr: Translation = this.result[key];

    if (!tr) {
      throw new Error(`Unknown translation key: ${key}`);
    }

    if (typeof tr === 'string') {
      return tr;
    } else if (tr[qty]) {
      return tr[qty];
    } else if ((tr).other) {
      return (tr).other;
    }

    throw new Error(`Unable to find translation for key ${key} qty ${qty}`);
  }
}