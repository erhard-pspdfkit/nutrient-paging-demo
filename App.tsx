import React, {Component} from 'react';
import {Alert, Button, Platform, View} from 'react-native';
import PSPDFKitView, { PDFConfiguration } from 'react-native-pspdfkit';
import { NativeModules } from 'react-native';

const PSPDFKit = NativeModules.PSPDFKit;
PSPDFKit.setLicenseKey(null);
var pdfRef: React.RefObject<PSPDFKitView> = React.createRef();
var currentIndex = 0;

const DOCUMENT =
  Platform.OS === 'ios' ? 'Document.pdf' : 'file:///android_asset/Document.pdf';

  interface IProps {
    navigation?: any;
    route?: any;
  }

export default class PSPDFKitDemo extends Component<IProps, any> {

  constructor(props: any) {
    super(props);
    this.state = {
      currentPageIndex: 0,
      pageCount: 0,
      disableButton: false,
    };
  }

  render() {
    return (
      <View style={styles.flex}>
      <PSPDFKitView
        document={DOCUMENT}
        ref={pdfRef}
        showNavigationButtonInToolbar={true}
        fragmentTag="PDF1"
        style={{flex: 1}}
        pageIndex={this.state.currentPageIndex}
        onStateChanged={(event: {
          currentPageIndex: any;
          pageCount: any;
        }) => {
          currentIndex = event.currentPageIndex;
          this.setState({
            disableButton: event.currentPageIndex === event.pageCount-1,
          });

          if (event.currentPageIndex !== this.state.currentPageIndex) {
            return;
          }
          
          this.setState({
            currentPageIndex: currentIndex,
            pageCount: event.pageCount,
          });
        }}
      />
      <View style={styles.wrapper}>
          <View style={styles.flex}>
            <Button
              accessibilityLabel={'Next Page'}
              testID={'Next Page'}
              disabled={
                this.state.disableButton
              }
              onPress={() => {
                this.setState({
                  currentPageIndex: currentIndex + 1,
                });
              }}
              title="Next Page"
            />
          </View>
        </View>
      </View>
    );
  }
}

const styles = {
  flex: { flex: 1 },
  pdfColor: { flex: 1 },
  wrapper: {
    flexDirection: 'row' as 'row',
    alignItems: 'center' as 'center',
    padding: 10,
  },
};