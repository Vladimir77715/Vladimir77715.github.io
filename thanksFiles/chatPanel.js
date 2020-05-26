/**
 * Created with JetBrains PhpStorm.
 * User: Yudin
 * Date: 31.01.18
 * Time: 13:25
 * To change this template use File | Settings | File Templates.
 */

function ChatPanel() {
    if (arguments[0] != null && typeof (arguments[0]) != 'undefined') {
        var settings = arguments[0];
    } else {
        var settings = {}
    }
    //��������� �� ���������
    this.defaultSettings = {
        'buttons': [],
        'expanded': false,
        'direction': 'horizontal',
        'effects': true,
        'right': 15,
        'bottom': 15,
        'hide_on_scroll': true,
        'collapse_on_click': false,
        'mouseover_sensible': false, //true ���� ��������� ���������� ������ ��� ��������� �����
        'slideable': true //���������� � ������������/������������
    }
    for (var key in this.defaultSettings) {
        if (typeof (settings[key]) != 'undefined') {
            this.defaultSettings[key] = settings[key];
        }
    }

    this.container = false; //���� � ��������
    this.button = false; //���� � ������� ������������/������������

    this._variableName = false; //��� ����������-������ ����� ������

    this._unique = '11_10_81_7'; //���������� �����, ������� ����� �������� � ���������� ����������� ����������� ��������,
    //����� ��������� �� ������������ � ����������������� ��������. � ������� ��������� �������
    //������ ���������� �� ��������� ���������� ����������.

    this.hideTimer = false;

    this.tooltipTimer = false; //������ �������� ���������� � ����������

    this.mouseOverObj = false; //DOM-������ ������ �� ����������, �� ������� ������� ������ ����.

    this.scrollCount = 0; //������ 3 ������� ������� ����������, �.�. ��� ����� ��������� ����� F5 ���� �� ����

    this.expandable = true; //����������� ������������ ������ ����� ��� �������� ��� �������

    this.buttonsReady = false; //���� ���������� �������� ���� ������ � �������������
}

/**
 * ��������� ������
 * @param object
 */
ChatPanel.prototype.addButton = function(object) {
    this.defaultSettings.buttons.push(object);
}

/**
 * ���������� ������ � ��������
 */
ChatPanel.prototype.expand = function() {
    if (this.container.getAttribute('expanded') == 0 && this.expandable) {
        this.renderButtons();//����������� ������ ���� ��� �� ���������
        var instanceName = this._getInstanceName();
        clearTimeout(this.hideTimer);
        this.button.style.width = '44px';
        this.button.style.height = '46px';
        if (this.button.childNodes.length) this.button.childNodes[0].style.opacity = 1;
        this.container.style.height = ((46 + 20) * this.defaultSettings.buttons.length) +  'px';
        this.container.setAttribute('expanded', 1);
        if (!this.defaultSettings.mouseover_sensible) {
            this.hideTimer = setTimeout(function() {
                window[instanceName].collapse();
            }, 7000);
        }
        //������� � ��������
        if (this.defaultSettings.effects) {
            for (var i = 0; i < this.defaultSettings.buttons.length; i++) {
                eval('setTimeout(function(){' + instanceName + '.zoomButton(' + i + ')}, ' + (100 * i + 200) + ')');
            }
        }
    }
}

/**
 * ��������� ������ ������������� � ��������� ������� ������ � ����������� �� ����������� ��� ������������
 * @param buttonIndex ����� ������ ������� � 0
 */
ChatPanel.prototype.zoomButton = function(buttonIndex) {
    this.container.childNodes[buttonIndex].style.transform = 'none';
}

/**
 * �������� ������ � ��������
 */
ChatPanel.prototype.collapse = function() {
    //return;
    if (this.defaultSettings.buttons.length == 1 || !this.defaultSettings.slideable) {
        //��� 1 ������ �� ����������� ������
        return;
    }
    if (this.container.getAttribute('expanded') == 1) {
        clearTimeout(this.hideTimer);
        this.button.style.width = '60px';
        this.button.style.height = '62px';
        if (this.button.childNodes.length) this.button.childNodes[0].style.opacity = 0;
        this.container.style.height = '10px';
        this.container.setAttribute('expanded', 0);
        for (var i = 0; i < this.container.childNodes.length; i++) {
            if (this.container.childNodes[i].getAttribute('id') != 'mt_fictive') {
                this.container.childNodes[i].style.transform = 'rotate(30deg) scale(0.5)';
            }
        }
        //������� ���������� ���� ��� ����������
        this.hideTooltip(0);
        /* var tooltip = document.getElementById('mess_tooltip');
        if (tooltip != null && tooltip && typeof(tooltip) != 'undefined') {
            tooltip.style.display = 'none';
        }*/
    }
}

/**
 * ������ ������ ������ � �������� ����������/��������
 */
ChatPanel.prototype.toggle = function() {
    if (this.container.getAttribute('expanded') == 0) {
        this.expand();
    } else {
        this.collapse();
    }
}

ChatPanel.prototype.show = function() {
    this.button.style.display = 'block';
    var instanceName = this._getInstanceName();
    setTimeout(function() {
        window[instanceName].button.style.opacity = 1;
    }, 50);
}

ChatPanel.prototype.hide = function() {
    var instanceName = this._getInstanceName();
    if (this.defaultSettings.buttons.length == 1) {
        //����� ������ 1 ������, � ������� ��������� ������ ���
        this.container.style.opacity = 0;
        clearTimeout(this.hideTimer);
        this.hideTimer = setTimeout(function() {
            window[instanceName].container.style.opacity = 1;
        }, 1500);
        return;
    };
    //���� ������� ������ ����� 2 � ����� ������.
    if (this.button.style.display != 'none') {
        this.collapse();
        this.button.style.opacity = 0;
        setTimeout(function() {
            window[instanceName].button.style.display = 'none';
        }, 500);
        this.expandable = false;
    }
    clearTimeout(this.hideTimer);
    this.hideTimer = setTimeout(function() {
        window[instanceName].show();
        window[instanceName].expandable = true;
    }, 1500)
}

/**
 * ��������� HTML ������������ ���� ����� �������� ��������, ���� ������ ��� ������������ ������. ������� ��������
 * � ����� �������������� �������� �������� ������� �������� �� ����� ���� ������������ ���� �� ����� ���� �� ������
 * ������������ ������.
 */
ChatPanel.prototype.renderButtons = function() {
    if (!this.buttonsReady) {
        var instanceName = this._getInstanceName();
        //������ ������������
        this.button.innerHTML = '<div style="width: 44px; height: 46px; right: 0px; bottom: 0px; position: absolute; transition: 0.5s; '
            + 'background-image: url(/img/mob/messengers/256x256_icon_close.png); background-size: contain; background-repeat: no-repeat; opacity: 0;"></div>'
        //������ ������������
        var html = '';
        var tooltipDetected = false;
        for (var i = 0; i < this.defaultSettings.buttons.length; i++) {
            //���������
            tooltipText = typeof (this.defaultSettings.buttons[i].tooltip_text) == 'undefined'? '': this.defaultSettings.buttons[i].tooltip_text;
            tooltipColor = typeof (this.defaultSettings.buttons[i].tooltip_color) == 'undefined'? '#389': this.defaultSettings.buttons[i].tooltip_color;
            tooltipTextColor = typeof (this.defaultSettings.buttons[i].tooltip_text_color) == 'undefined'? '#FFF': this.defaultSettings.buttons[i].tooltip_text_color;
            if (tooltipText) {
                tooltipDetected = true;
                var mouseEvents = ' onmouseover="' + this._getInstanceName() + ".showTooltip(this, '" + tooltipText
                    + "', '" + tooltipTextColor  + "', '" + tooltipColor + "')\" onmouseout = \"" + this._getInstanceName() + '.hideTooltip(1000)"';
            } else {
                var mouseEvents = '';
            }

            //������ onclick ���� ������
            if (typeof (this.defaultSettings.buttons[i].onclick) != 'undefined') {
                mouseEvents += ' onclick="' + instanceName + '.defaultSettings.buttons[' + i + '].onclick()"';
            }

            var tag = typeof (this.defaultSettings.buttons[i].href) == 'undefined'? 'span': 'a';
            var href = typeof(this.defaultSettings.buttons[i].href) != 'undefined'? ' href="' + this.defaultSettings.buttons[i].href + '"': '';
            var dataToggle = typeof(this.defaultSettings.buttons[i].data_toggle) != 'undefined'? ' data-toggle="' + this.defaultSettings.buttons[i].data_toggle + '"': '';
            var dataTarget = typeof(this.defaultSettings.buttons[i].data_target) != 'undefined'? ' data-target="' + this.defaultSettings.buttons[i].data_target + '"': '';
            var target = typeof(this.defaultSettings.buttons[i].target) != 'undefined'? ' target="' + this.defaultSettings.buttons[i].target + '"': '';
            var className = typeof(this.defaultSettings.buttons[i].class) != 'undefined'? ' class="' + this.defaultSettings.buttons[i].class + '"': '';
            html += '<' + tag + ' style="display: inline-block; width: 44px; height: 46px; margin-bottom: 18px; z-index: 1038;' + buttonStyle + ' background-image: url('
                + this.defaultSettings.buttons[i].background + '); background-size: contain; background-repeat: no-repeat; display: block; width: 44px;"'
                + href + dataToggle + dataTarget + target + className + mouseEvents + '></' + tag + '>'
        }
        //��������� ��������� ������ ��� ����������-��������� �.�. ���� ��� ���� � DOM - ���� � ����� �� ��������� �� ������
        i--;
        html += '<a style="display: inline-block; width: 44px; height: 46px; margin-bottom: 18px; z-index: 1038; transform:none; opacity: 0.01; background-image: url('
            + this.defaultSettings.buttons[i].background + '); background-size: contain; background-repeat: no-repeat; display: block; width: 44px;" id="mt_fictive"></a>'

        this.container.innerHTML = html;
        document.body.appendChild(this.container);

        //���� � ����� � ����������� ����. �������� ������ ��������� �� ��������� ������ � ��� �� �� ������.
        this.showTooltip(document.getElementById('mt_fictive'), 'test', 'red', '#eda'); //'', 'transparent', 'transparent');
        this.hideTooltip(0);

        //������� �� ��������� ������ ������ (��� ������� ����������)
        if (tooltipDetected) {
            window.addEventListener('resize', function() {
                window[instanceName].locateTooltip();
            }, false);
        }
        // ���� �� ����� 1 ������ �� ����� ����������� ������.
        if (this.defaultSettings.buttons.length == 1 || !this.defaultSettings.slideable) {
            setTimeout(function() {
                window[instanceName].expand();
            }, 100)
        }
    }
    this.buttonsReady = true;
    this.container.setAttribute('expanded', 0); //��� �����. ��������� ����������� ��������� ��������, ��������� ������������ ������ � ��������
}

/**
 * ���������� ������
 */
ChatPanel.prototype.render = function() {
    var instanceName = this._getInstanceName();
    if (document.body != null && document.body) {
        window.addEventListener('load', function() {
            //�������������� �������� ������ � ������������� ����� �������� ��������
            window[instanceName].renderButtons();
        }, false);
        //��������� � ��������
        this.container = document.createElement("div");
        this.container.setAttribute('class', 'chatpanel');
        this.container.style.position = 'fixed';
        this.container.style.bottom = (this.defaultSettings.buttons.length > 1 && this.defaultSettings.slideable? this.defaultSettings.bottom + 45: this.defaultSettings.bottom - 12) + 'px';
        this.container.style.right = this.defaultSettings.right + 'px';
        this.container.style.width = '44px';
        this.container.style.height = '10px'; //��������� ������ ���������� � ��������
        this.container.style.transition = '0.5s';
        this.container.style.zIndex = 1038;
        this.container.setAttribute('expanded', 1); //��� ����� ����� ����� ���� ������� ��������� ����������� ���������.
        this.container.style.overflow = 'hidden';

        if (this.defaultSettings.effects) {
            buttonStyle = ' transition: 0.3s; transform: rotate(30deg) scale(0.5);';
        } else {
            buttonStyle = '';
        }

        //������� �� ��������� �����
        if (this.defaultSettings.mouseover_sensible) {
            this.container.onmouseout = function() {
                clearTimeout(window[instanceName].hideTimer);
                window[instanceName].hideTimer = setTimeout(function() {
                    window[instanceName].collapse();
                }, 7000);
            }
            this.container.onmouseover = function() {
                clearTimeout(window[instanceName].hideTimer);
            }
        }

        //������ ������������/������������
        this.button = document.createElement("div");
        this.button.style.position = 'fixed';
        this.button.style.bottom = this.defaultSettings.bottom + 'px';
        this.button.style.right = this.defaultSettings.right + 'px';
        this.button.style.width = '60px';
        this.button.style.height = '62px';
        this.button.style.transition = '0.5s';
        this.button.style.zIndex = 1039;
        this.button.style.cursor = 'pointer';
        this.button.style.backgroundImage = 'url(/img/mob/messengers/icon_chat.png)';
        this.button.style.backgroundSize = 'cover';
        //this.button.style. = '';
        this.button.onclick = function(e) {
            window[instanceName].toggle();
            e.stopPropagation();
        }
        if (this.defaultSettings.buttons.length > 1 && this.defaultSettings.slideable) {
            document.body.appendChild(this.button);
        }


        //������� ������� ���������
        if (this.defaultSettings.hide_on_scroll) {
            window.addEventListener('scroll', function(e) {
                if (window[instanceName].scrollCount < 3) {
                    window[instanceName].scrollCount++;
                    return;
                }
                window[instanceName].hide();
            }, false);
        }
        //������� ������� ������ ����
        if (this.defaultSettings.collapse_on_click) {
            document.body.addEventListener('click', function(e) {
                window[instanceName].collapse();
            }, false);
        }

        //������ �� ��������� ����� �� ������ ������������/������������
        if (this.defaultSettings.mouseover_sensible) {
            this.button.onmouseout = function() {
                clearTimeout(window[instanceName].hideTimer);
                window[instanceName].hideTimer = setTimeout(function() {
                    window[instanceName].collapse();
                }, 7000);
            }
            this.button.onmouseover = function() {
                clearTimeout(window[instanceName].hideTimer);
            }
        }
    } else {
        setTimeout(function() {
            window[instanceName].render();
        }, 50);
    }
}

/**
 * ��������� ��������� ����� �� ������ � ������������.
 * ������ ������ ����������� ����������
 * ����� ���������
 * ���� ������ ���������
 * ���� ���� ���������
 */
ChatPanel.prototype.showTooltip = function(obj, text, textColor, backgroundColor) {
    if (this.container.getAttribute('expanded') != '1') {
        return;
    }
    //���� ��� ����������� ���������
    var instanceName = this._getInstanceName();
    var tooltip = document.getElementById('mess_tooltip');
    if (tooltip == null || (!tooltip) || typeof(tooltip) == 'undefined') {
        tooltip = document.createElement('div');
        tooltip.id = 'mess_tooltip';
        tooltip.style.display = 'none';
        tooltip.style.position = 'fixed';
        tooltip.style.fontFamily = 'arial';
        tooltip.style.fontSize = '0.85em';
        tooltip.style.padding = '4px 12px';
        tooltip.style.borderRadius = '4px';
        tooltip.style.zIndex = 9;
        tooltip.style.textShadow = '0px 0px 1px rgba(0, 0, 0, 0.4)';
        tooltip.onclick = function(e) {
          //e.stopPropagation();
          return false;
        };
    }
    obj.appendChild(tooltip);
    tooltip.style.display = 'block';
    tooltip.style.color = textColor;
    tooltip.style.background = backgroundColor;

    //�������������� ������� (���� � �����), ���������� �������� �� ������ ��������������
    tooltip.style.overflow = 'inherit';
    tooltip.style.width = '170px';
    tooltip.style.opacity = '1';

    this.mouseOverObj = obj;
    this.locateTooltip();
    setTimeout(function() {
        window[instanceName].locateTooltip();
    }, 300);

    tooltip.innerHTML = '<div style="float: right; margin: 3px -14px 0px 0px; width: 12px; height: 12px; background: '
        + backgroundColor + '; transform: rotate(45deg); webkit-transform: rotate(45deg); "></div>' + text;
    clearTimeout(this.tooltipTimer);
}

/**
 * �������� ��������� ��������������� ���������
 */
ChatPanel.prototype.locateTooltip = function() {
    var tooltip = document.getElementById('mess_tooltip');
    if (tooltip != null && tooltip && typeof(tooltip) != 'undefined') {
        var objRect = this.mouseOverObj.getBoundingClientRect();
        tooltip.style.top = (objRect.top + 10) + 'px';
        tooltip.style.right = (objRect.width + this.defaultSettings.right + 5) + 'px';
    }
}

/**
 * ��������� ������ �� �������� ���������
 */
ChatPanel.prototype.hideTooltip = function(timeout) {
    if (timeout) {
        var instanceName = this._getInstanceName();
        this.tooltipTimer = setTimeout(function() {
            window[instanceName].hideTooltip()
        }, timeout);
    } else {
        var tooltip = document.getElementById('mess_tooltip');
        if (tooltip != null && tooltip && typeof(tooltip) != 'undefined') {
            //���������� � ��������� ������ ������� �� ������ �������� transform � ������ ��������� ���������
            //�.�. � ����� ��� ��������� ������� � ����� ���� �������� �� ������
            document.getElementById('mt_fictive').appendChild(tooltip);
            tooltip.style.overflow = 'hidden';
            tooltip.style.width = '1px';
            tooltip.style.right = '0px';
            tooltip.style.opacity = '0.01';
            //����� � IE, ����� ����� �� �������, ������������ � �������� ����������� ���� ��������� ���� ������ ������
            var browser = navigator.userAgent;
            if (browser.indexOf('Firefox') == -1 && browser.indexOf('Chrome') == -1 && browser.indexOf('OPR') == -1 && browser.indexOf('Webkit') == -1) {
                document.getElementById('mt_fictive').style.display = 'none';
            }
        }
    }
}

/**
 * ����� ��� ����������� ����� ����������, ������� �������� ������� �������� Messengers, �� ������� ���� �����
 */
ChatPanel.prototype._getInstanceName = function() {
  if (!this._variableName) {
    for (var variable in window) {
      if (/^[0-9]/.test(variable) || /^[0-9A-F]+$/.test(variable)) {
        continue;
      }
      try {
        if (variable != 'webkitStorageInfo' && window[variable] != null && typeof(window[variable]._getInstanceName) == 'function' && window[variable]._unique == '11_10_81_7') {
          this._variableName = variable;
          break;
        }
      } catch (e) {}
    }
  }
  return this._variableName;
}
