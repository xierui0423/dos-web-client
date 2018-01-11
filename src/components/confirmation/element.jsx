import React from 'react';
import ReactDOM, { unmountComponentAtNode } from 'react-dom';
import Dialog, { DialogActions, DialogContent, DialogTitle } from 'material-ui/Dialog';
import Button from 'material-ui/Button';


function closeConfirmationDialog() {
  unmountComponentAtNode(document.getElementById('confirmation'));
}

const ConfirmationElement = ({ title, text, alert, handleOk, handleCancel }) => (
  <Dialog
    open
    onClose={closeConfirmationDialog}
    disableBackdropClick={!alert}
  >

    {!alert ? <DialogTitle>{title}</DialogTitle> : null}

    <DialogContent>
      {alert || text}
    </DialogContent>

    {!alert ? <DialogActions>
      <Button
        onClick={() => {
          if (typeof handleCancel === 'function') {
            handleCancel();
          }
          closeConfirmationDialog();
        }}
        color="primary"
      >
          Cancel
        </Button>
      <Button
        onClick={() => {
          if (typeof handleOk === 'function') {
            handleOk();
          }
          closeConfirmationDialog();
        }}
        color="primary"
      >
          Ok
        </Button>
    </DialogActions> : null}
  </Dialog>);

// LoadingModal.propTypes = {
//   loadingMessages: ImmutablePropTypes.list.isRequired,
// };
//
// const mapStateToProps = state => (
//   {
//     loadingMessages: state.get('loadingMessages'),
//   }
// );


export default (props) => {
  ReactDOM.render(
    <ConfirmationElement {...props} />,
    document.getElementById('confirmation'),
  );
};
