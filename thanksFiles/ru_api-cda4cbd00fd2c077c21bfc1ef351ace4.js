I18n.store_translations('ru', {"time.days.one":"день","time.days.few":"дня","time.days.many":"дней","time.hours.one":"час","time.hours.few":"часа","time.hours.many":"часов","time.minutes.one":"минуту","time.minutes.few":"минуты","time.minutes.many":"минут","time.seconds.one":"секунду","time.seconds.few":"секунды","time.seconds.many":"секунд","email.email_required":"Нужно ввести хотя бы один адрес","email.message_too_long":"Должно быть меньше 300 символов","email.wrong_email_format":"Эти адреса не похожи на email"});/* global I18n */

I18n.store_translations('ru', {
  '_pluralize': function (a) {
    if (a % 10 === 1 && a % 100 !== 11) {
      return 'one';
    } else if (a % 10 >= 2 && a % 10 <= 4 && (a % 100 < 10 || a % 100 >= 20)) {
      return 'few';
    } else {
      return 'many';
    }
  }
});


