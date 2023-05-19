import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Svg, Rect, Text as SvgText, Circle, Path } from 'react-native-svg';

export default function Logo() {
    return (
        <Svg width={259} height={446} style={{marginLeft:-60}}>
          <Rect x={102} y={370} fill="none" />
          <SvgText x={147} y={403} fontFamily="Poppins" fontWeight="800" fontSize={50} fill="#FF9C00" textAnchor="middle">sisagiz.</SvgText>
          <SvgText x={134} y={431} fontFamily="Poppins" fontWeight="400" fontSize={15} fill="rgba(255,255,255, 1)" textAnchor="middle">Sistem Informasi Gizi</SvgText>
          <Circle cx={133} cy={375.5} r={5.5} fill="#FFAC0A" />
          <Circle cx={201} cy={394} r={5.5} fill="#FFE0A4" />
          <Circle cx={255} cy={402} r={5.5} fill="#EAC1AE" />
          <Circle cx={174} cy={394} r={5.5} fill="#9669A9" />
        </Svg>
      )
}

const styles = StyleSheet.create({})