import React, { Component } from 'react'
import { StyleSheet, View, Text, FlatList, TouchableOpacity } from 'react-native'
import { ToastType } from '../components/toast'
import { useToaster, PortalContext, PortalContextProps } from '../toaster'

// Home screen (funcational component)

export const HomeScreen = () => {
  const showToast = useToaster()
  // Or even without our custom hook we still can use the context directly,
  // showToast is typed and correct!
  // const { showToast } = useContext(PortalContext);

  return (
    <View style={styles.screen}>
      <FlatList
        style={styles.toastList}
        data={[
          {
            type: ToastType.Info,
            name: 'Information Toast',
            backgroundColor: '#F2F2F2',
            titleColor: '#000',
            captionColor: '#A0A0A0',
            showToast: () => showToast('Some information for the user.', ToastType.Info),
          },
          {
            type: ToastType.Error,
            name: 'Error Toast',
            backgroundColor: '#7E4A68',
            titleColor: '#F2F2F2',
            captionColor: '#C29AB3',
            showToast,
          },
          {
            type: ToastType.Success,
            name: 'Success Toast',
            backgroundColor: '#F7C844',
            titleColor: '#fff',
            captionColor: '#F2F2F2',
            showToast: () => showToast('Some information for the user.', ToastType.Success),
          },
        ]}
        keyExtractor={item => item.type}
        renderItem={({ item }) => (
          <TouchableOpacity
            activeOpacity={0.8}
            style={StyleSheet.flatten([
              styles.toastListItem,
              { backgroundColor: item.backgroundColor },
            ])}
            onPress={() => item.showToast()}>
            <Text
              style={StyleSheet.flatten([styles.toastListItemTitle, { color: item.titleColor }])}>
              Trigger {item.name}
            </Text>
            <Text
              style={StyleSheet.flatten([
                styles.toastListItemCaption,
                { color: item.captionColor },
              ])}>
              Type: {item.type}
            </Text>
          </TouchableOpacity>
        )}
      />
    </View>
  )
}

// Details screen (class component)

export class DetailsScreen extends Component<{}, {}> {
  public static contextType = PortalContext
  // Necessary so this.context has correct types
  public context!: PortalContextProps

  render() {
    return (
      <View style={styles.screen}>
        <FlatList
          style={styles.toastList}
          data={[
            {
              type: ToastType.Info,
              name: 'Information Toast',
              backgroundColor: '#C6C1DE',
              titleColor: '#000',
              captionColor: '#5D5963',
              showToast: () =>
                this.context.showToast('Details: Some information for the user.', ToastType.Info),
            },
            {
              type: ToastType.Error,
              name: 'Error Toast',
              backgroundColor: '#E1AE9D',
              titleColor: '#000',
              captionColor: '#5D5963',
              showToast: () => this.context.showToast('Details: Some information for the user.'),
            },
            {
              type: ToastType.Success,
              name: 'Success Toast',
              backgroundColor: '#E2F0F3',
              titleColor: '#000',
              captionColor: '#5D5963',
              showToast: () =>
                this.context.showToast(
                  'Details: Some information for the user.',
                  ToastType.Success,
                ),
            },
          ]}
          keyExtractor={item => item.type}
          renderItem={({ item }) => (
            <TouchableOpacity
              activeOpacity={0.8}
              style={StyleSheet.flatten([
                styles.toastListItem,
                { backgroundColor: item.backgroundColor },
              ])}
              onPress={() => item.showToast()}>
              <Text
                style={StyleSheet.flatten([styles.toastListItemTitle, { color: item.titleColor }])}>
                Trigger {item.name}
              </Text>
              <Text
                style={StyleSheet.flatten([
                  styles.toastListItemCaption,
                  { color: item.captionColor },
                ])}>
                Type: {item.type}
              </Text>
            </TouchableOpacity>
          )}
        />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
  },
  toastList: {
    flex: 1,
    width: '100%',
  },
  toastListItem: {
    height: 150,
    backgroundColor: '#F2F2F2',
    marginTop: 20,
    marginHorizontal: 20,
    flex: 1,
    borderRadius: 30,
  },
  toastListItemTitle: {
    marginTop: 40,
    fontSize: 20,
    marginLeft: 40,
  },
  toastListItemCaption: {
    marginTop: 5,
    fontSize: 16,
    marginLeft: 40,
  },
})
