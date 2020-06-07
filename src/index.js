/**
 * 功能介绍：可拖拽的移动端悬浮图标
 * Created By small_knife On 2020/6/3 16:19
 */

import React, { useState, useRef, useEffect } from 'react';
import PropTypes from 'prop-types';
import ClassNames from 'classnames';
import './index.css';

// 变量集合
const _variables = {
  // 是否移动
  isMoving: false,
  // 是否点击
  isClick: false,
  // 悬钮距离
  oW: null,
  oH: null,
  // 悬钮宽度
  btnWidth: null,
  btnHeight: null,
  // 页面宽高
  htmlWidth: null,
  htmlHeight: null
};

const TouchDragButton = ({ children, className  }) => {
  const $dragRef = useRef(null);
  // 左偏移量
  const [offLeft, setOffLeft] = useState("");
  // 上偏移量
  const [offTop, setOffTop] = useState("");

  // 监听
  useEffect(() => {
    $dragRef.current.addEventListener("touchmove", (e) => {
      if (e.cancelable) {
        e.preventDefault();
      }
    }, { passive: false });
  }, []);

  // 触发移动
  const _onTouchStart = (e) => {
    e = e.touches[0];
    _variables.isClick = true;

    _variables['oW'] = e.clientX - $dragRef.current.getBoundingClientRect().left;
    _variables['oH'] = e.clientY - $dragRef.current.getBoundingClientRect().top;
    // 获取页面的宽高
    _variables['htmlWidth'] = document.documentElement.clientWidth;
    _variables['htmlHeight'] = document.documentElement.clientHeight;
    // 获取按钮拖拽按钮的宽高
    _variables['btnWidth'] = $dragRef.current.offsetWidth;
    _variables['btnHeight'] = $dragRef.current.offsetHeight;

    // 计算偏移量
    const oLeft = e.clientX - _variables['oW'];
    const oTop = e.clientY - _variables['oH'];
    setOffLeft(oLeft);
    setOffTop(oTop);
    _variables['isMoving'] = true;
  };

  // 移动中
  const _onMove = (e) => {
    e = e.touches[0];
    _variables['isClick'] = false;
    // 计算左侧距离
    let oLeft = e.clientX - _variables['oW'];
    let oTop = e.clientY - _variables['oH'];
    if (oLeft < 0) {
      oLeft = 0;
    } else if (oLeft > _variables['htmlWidth'] - _variables['btnWidth']) {
      oLeft = _variables['htmlWidth'] - _variables['btnWidth'];
    }

    if (oTop < 0) {
      oTop = 0;
    } else if (oTop > _variables['htmlHeight'] - _variables['btnHeight']) {
      oTop = _variables['htmlHeight'] - _variables['btnHeight'];
    }

    setOffLeft(oLeft);
    setOffTop(oTop);
  };

  // 开始移动
  const _onTouchMove = (e) => {
    $dragRef.current.className = 'drag_button';
    _variables['isMoving'] && _onMove(e);
  };

  // 移动结束
  const _onTouchEnd = (e) => {
    _variables['isMoving'] = false;
    // 给拖拽容器添加动画
    $dragRef.current.className = $dragRef.current.className + ' drag_button__animate';

    // 左侧距离
    let oLeft = offLeft;
    if (oLeft < (_variables['htmlWidth'] - _variables['btnWidth']) / 2) {
      oLeft = 0;
    } else {
      oLeft = _variables['htmlWidth'] - _variables['btnWidth'];
    }
    setOffLeft(oLeft);
  };

  return (
    <div
      ref={$dragRef}
      className={ClassNames(
        "drag_button",
        className
      )}
      onTouchStart={_onTouchStart}
      onTouchMove={_onTouchMove}
      onTouchEnd={_onTouchEnd}
      style={{
        left: `${offLeft}px`,
        top: `${offTop}px`,
      }}
    >
      {children}
    </div>
  );
};

// 类型规范
TouchDragButton.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string
};

export default TouchDragButton;
