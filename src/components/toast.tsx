import React from 'react'
import {
  View,
  StyleSheet,
  Text,
  Easing,
  Animated,
  PanResponder,
  Platform,
  SafeAreaView,
  PanResponderInstance,
  ViewStyle,
  StyleProp,
  TextStyle,
} from 'react-native'
import { PortalContext, PortalContextProps } from '../toaster/portalContext'

export enum ToastType {
  Info = 'info',
  Error = 'error',
  Success = 'success',
}

interface IProps {
  children: React.ReactNode
  type?: ToastType
}

interface IState {
  animationXY: Animated.ValueXY
  animationOpacity: Animated.Value
  swipe: boolean
}

class Toast extends React.PureComponent<IProps, IState> {
  private timer: number | null = null
  private panResponder: PanResponderInstance | null = null

  public static defaultProps = { type: ToastType.Error }
  public static contextType = PortalContext
  // Necessary so this.context has correct types
  public context!: PortalContextProps

  public constructor(props: IProps) {
    super(props)

    this.panResponder = PanResponder.create({
      onMoveShouldSetPanResponderCapture: () => {
        this.onTouch()
        return true
      },
      onPanResponderMove: () => false,
      onPanResponderRelease: (event, { dy }) => {
        if (dy < 0) {
          this.endAnimation()
        }
      },
    })

    this.state = {
      animationXY: new Animated.ValueXY({ x: 0, y: -200 }),
      animationOpacity: new Animated.Value(0),
      swipe: false,
    }
  }

  public componentDidMount() {
    this.onShow()
  }

  private onShow = () => {
    this.startAnimation()

    this.timer = setTimeout(() => {
      if (!this.state.swipe) {
        this.endAnimation()
      }
    }, 1000)
  }

  private onTouch = () => {
    if (this.timer) {
      clearInterval(this.timer)
    }
    this.setState({ swipe: true })
  }

  private startAnimation = () => {
    const { animationXY, animationOpacity } = this.state

    Animated.parallel([
      Animated.timing(animationXY, {
        toValue: { x: 0, y: 0 },
        useNativeDriver: true,
        easing: Easing.bezier(0.175, 0.885, 0.32, 1.125),
        duration: 400,
      }),
      Animated.timing(animationOpacity, {
        toValue: 1,
        useNativeDriver: true,
        duration: 400,
      }),
    ]).start()
  }

  private endAnimation = () => {
    const { animationXY, animationOpacity } = this.state

    Animated.parallel([
      Animated.timing(animationXY, {
        toValue: { x: 0, y: -200 },
        useNativeDriver: true,
        duration: 400,
      }),
      Animated.timing(animationOpacity, {
        toValue: 0,
        useNativeDriver: true,
        duration: 200,
      }),
    ]).start(() => {
      this.setState({ swipe: false })
      // We should clean up our toaster after the animation has ended
      this.context.teleport('toaster', null)
    })
  }

  public render() {
    const { children, type } = this.props
    const { animationXY, animationOpacity } = this.state

    let toastContainerStyle: StyleProp<ViewStyle> = {}
    let toastTextStyle: StyleProp<TextStyle> = {}

    switch (type) {
      case ToastType.Info:
        toastContainerStyle = styles.infoContainer
        toastTextStyle = styles.infoText
        break
      case ToastType.Error:
        toastContainerStyle = styles.errorContainer
        toastTextStyle = styles.errorText
        break
      case ToastType.Success:
        toastContainerStyle = styles.successContainer
        toastTextStyle = styles.successText
        break
      default:
        break
    }

    const animatedStyle = {
      opacity: animationOpacity,
      transform: [{ translateY: animationXY.y }, { translateX: animationXY.x }],
    }

    return (
      <SafeAreaView style={styles.containerToaster}>
        <Animated.View
          {...this.panResponder?.panHandlers}
          style={[styles.container, animatedStyle]}>
          <View style={StyleSheet.flatten([styles.contentContainer, toastContainerStyle])}>
            <Text style={StyleSheet.flatten([styles.text, toastTextStyle])}>{children}</Text>
          </View>
        </Animated.View>
      </SafeAreaView>
    )
  }
}

export default Toast

const styles = StyleSheet.create({
  container: {
    marginTop: 5,
    marginBottom: 12,
    marginHorizontal: 0,
    paddingHorizontal: 8,
    position: 'relative',
    flex: 1,
  },
  contentContainer: {
    borderRadius: 5,
    flexDirection: 'row',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.16,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 2 },
    elevation: 8,
    minHeight: 'auto',
    minWidth: '100%',
  },
  containerToaster: {
    flex: 1,
    paddingTop: 0,
    zIndex: 100000,
    position: 'absolute',
    top: Platform.select({ android: 5, ios: 0 }),
    right: 0,
    width: '100%',
    height: 'auto',
    elevation: 100,
  },
  text: {
    flex: 1,
    marginHorizontal: 8,
    fontSize: 14,
    paddingVertical: 8,
  },
  infoContainer: {
    backgroundColor: 'white',
  },
  errorContainer: {
    backgroundColor: 'red',
  },
  successContainer: {
    backgroundColor: 'green',
  },
  infoText: {
    color: 'black',
  },
  errorText: {
    color: 'white',
  },
  successText: {
    color: 'white',
  },
})
