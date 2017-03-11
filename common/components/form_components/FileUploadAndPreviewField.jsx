import React from 'react';
import { Alert } from 'react-bootstrap';
import log from 'loglevel';

import getSlug from 'speakingurl';
import Cookies from 'js-cookie';
import Dropzone from 'react-dropzone';
import AWS from 'aws-sdk';
import _ from 'lodash';
/*
 AWS javascript sdk setup for S3
 */

let bucket;
try {
    AWS.config.update({
        accessKeyId: 'AKIAIXLTFCVHR5BAIMEA',
        secretAccessKey: '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'
    });
    // AWS.config.loadFromPath('./aws-credentials.json');
    AWS.config.region = 'ap-southeast-1';
    //log.debug('domain is', document.domain);
    log.debug('aws access key', process.env.AWS_ACCESS_KEY_ID);

    if (typeof document !== 'undefined' && document.domain.indexOf('local') > -1) {
        log.debug('development environment');
        bucket = new AWS.S3({ params: { Bucket: 'afme-test' } });
    } else {
        log.debug('production environment');
        bucket = new AWS.S3({ params: { Bucket: 'afme' } });
    }
} catch (e) {
    log.error(e.stack);
}

export default class FileUploadAndPreviewField extends React.Component {
    constructor(props) {
        super(props);
        // console.log('constructor');

        var csrftoken = Cookies.get('csrftoken');
        var user = Cookies.get('email');
        // console.log('the csrf token is ' + csrftoken);

        // if (this.props.images) {
        //     this.state = {
        //         images: this.props.images,
        //     };
        // } else {
        this.state = {
            file: {
                title: '',
                slug: '',
                type: '',
                class_name: '',
            },
            totalCount: 0,
            uploadedFiles: [],
            uploadedFilesNames: [],
            imagesUploaded: [],
            files: [],
            uploadedToS3Count: 0,
            category: {slug: user, title: user},
            fileIcons: [],
            isMouseOver: false,
            uploadedFile:{src:this.props.imgUrl}
        }
        this.state.loaded = false;
    }


    handleSubmit() {
        // console.log('handleSubmit');
        this.setState({formSubmissionResult: (<Alert bsStyle="warning">uploading...</Alert>)});
        if (this.props.action) {
            var self = this;

            switch (this.props.action) {
                case 'create':
                    const file = this.state.file;
                    let count = 0;
                    const changedState = self.state;
                    if (!this.state.files || this.state.files.length === 0) {

                        changedState.formSubmissionResult = (<Alert bsStyle="warning">no files selected</Alert>);
                        self.setState(changedState);
                        return;
                    } else {
                        if (this.state.files[0].size > 2500000) {
                            changedState.formSubmissionResult =
                                (<Alert bsStyle="warning">Single file can not execeed 2.5MB</Alert>);
                            self.state.files = [];
                            self.setState(changedState);
                        }else if(!this.state.files[0].type.indexOf("image") == -1) {
                            changedState.formSubmissionResult =
                                (<Alert bsStyle="warning">Please upload image files only</Alert>);
                            self.state.files = [];
                            self.setState(changedState);
                        }
                        else {
                            // console.log('here - - - - - - - - - - - - - - - - - - - - - - - - - ');
                            if (this.props.imageUploading) {
                                this.props.imageUploading(true);
                            }
                            this.uploadToS3(this.state.files[0]);
                        }
                    }
                    break;
                case 'edit':
                    break;
                case 'delete':
                    break;
            }
        }

    }

    componentWillUpdate(nextProps) {
        // console.log('COMPONENT WILL UPDATE');
        // console.log(this.props.imgUrl);
        // console.log(nextProps.imgUrl);
        if (this.props.imgUrl !== undefined && nextProps.imgUrl === undefined) {
            this.state.formSubmissionResult = (<div/>);
        }

    }

    componentWillReceiveProps(nextProps) {
        if(nextProps.imgUrl){
            this.setState({
                uploadedFile:{src:nextProps.imgUrl}
            });
        }
    }

    handleChange(fieldId, index, e) {
        // console.log('handleChange');
        var change = this.state;
        switch (fieldId) {
            case 'file_name':
                this.state.fileIcons = [];
                this.state.uploadedFiles[index].title = e.target.value;
                break;
            case 'file_type':
                this.state.fileIcons = [];
                this.state.uploadedFiles[index].type = e;
                break;
            default:
        }
        this.setState(this.state);
        this.renderFileIcons();
        this.props.handleFileUpload(this.state.uploadedFiles);

    }

    onDrop(images) {
        // console.log('onDrop', images);
        /*
         upload to amazon s3
         */
        // var imgToUp = this.state.imgToUp;

        var files = this.state.files;
        var file = this.state.file;
        var message = images.length + ' files selected: ';
        images.map(function (file) {
            message += file.name + ', ';
            // var image = {title: file.title, slug: file.slug, parent_folder: 1, src: ''};// HARDCODE set the parent folder to "images" always for now
            // if (!file.title) image.title = file.name;
            // imgToUp.push(image);
            files.push(file);
        });
        // var alert = (<Alert bsStyle="info">{message}</Alert>);
        // this.setState({formSubmissionResult: alert});
        this.handleSubmit();
    }

    uploadToS3(file) {
        log.info('uploadToS3')
        /*
         Fixes location to images folder for now
         but will ask users to select location to upload images to
         */
        var location = 'bv';
        if (this.state.category) {
            if (this.state.category.slug) location += '/' + this.state.category.slug;
            else if (this.state.category.title) {
                location += '/' + getSlug(this.state.category.title);
            }
        }
        var params = {Key: location + '/' + file.name, ContentType: file.type+';charset=UTF-8', Body: file, ACL: "public-read"};
        log.info('uploading to S3', JSON.stringify(params, null, 4));
        // var uploadedToS3Count = this.state.uploadToS3;
        // var imgToUpCount = this.state.imgToUp.length;
        var self = this;
        var imagesUploaded = this.state.imagesUploaded;
        var file = this.state.file;
        var files = this.state.files;
        // console.time('upload image ' + file.name);

        var imageToUp = {};
        imageToUp.title = file.name;

        // var image = {title: file.name, slug: '', src: data.Location};// hardcode folder to the default 'images' folder for now
        var suffix = '';
        if (file.title) imageToUp.title = file.title + ' ' + suffix;
        if (file.slug) imageToUp.slug = file.slug + '-' + suffix;
        imageToUp.slug = getSlug(imageToUp.title);
        if (this.state.category) imageToUp.parent_folder = this.state.category;
        if (file.tags) imageToUp.tags = file.tags;
        var jsonStr = JSON.stringify(imageToUp, null, 4);
        log.debug('image to upload to S3', jsonStr);

        if (bucket)
            var upload = bucket.upload(params, function (err, data) {
                if (err) {
                    self.state.formSubmissionResult = (<Alert bsStyle="danger">error</Alert>);
                    self.setState(self.state);
                } else {
                    if (self.props.imageUploading) {
                        self.props.imageUploading(false);
                    }
                    log.info('UPLOADED to - ' + data.Location);
                    // uploadedToS3Count++;
                    imageToUp.src = data.Location;
                    imageToUp.file = self.state.files[0];
                    log.debug('number of images uploaded', imagesUploaded.length);
                    // if (imagesUploaded.length === files.length) {
                    log.info('all the images uploaded to S3');
                    self.save(imageToUp);

                    // }
                }
            }).on('httpUploadProgress', function (progress) {
                // Log Progress Information
                // logger.log('uploading ' + file.name + ' ' + Math.round(progress.loaded / progress.total * 100) + '% done');
                console.timeEnd('upload image ' + file.name);
            });
        // imagesUploaded.push(imageToUp);
        // if (imagesUploaded.length === files.length) this.save(imagesUploaded);
    }

    save(fileUploaded) {
        this.state.formSubmissionResult = (<Alert bsStyle="success">File has been uploaded successfully.</Alert>);
        fileUploaded.title = fileUploaded.file.name;
        this.state.uploadedFile = fileUploaded;
        if(this.props.onImageUploaded) this.props.onImageUploaded(this.state.uploadedFile.src);
        this.renderFileIcons();
        this.state.loaded = false;
        this.state.files = [];
        this.setState(this.state);

    }

    handleRemoveFile(fileUploaded) {
        this.state.uploadedFile.src="";
        if(this.props.onImageUploaded) {
          if (this.props.isUserProfile) {
              this.props.onImageUploaded("");
          }else {
            this.props.onImageUploaded(undefined);
          }
        }
    }


    onMouseOver() {
        // console.log('1');
    }

    onMouseEnter() {
        this.setState({
            isMouseOver: true
        });
        // console.log('2');
    }

    onMouseLeave() {
        this.setState({
            isMouseOver: false
        });
        // console.log('3');
    }

    renderFileIcons() {

    }

    render() {
        // console.log('render');
        // console.log(this.props.imgUrl);
        var categories = [];
        var categoryId = -1;
        var handleFileUpload;
        var value;
        var label;
        var fileName = "No file chosen";
        var filePreviewStyle;
        var defaultText;
        var deleteIcon;
        var removeBtn;

        const noStyle = this.props.noStyle === undefined ? false : true;
        if (this.props.label) label = this.props.label;


        if (_.isEmpty(this.props.imgUrl) && this.props.defaultImgUrl) {
            filePreviewStyle = {
                backgroundImage: 'url('+this.props.defaultImgUrl+')',
            };
            // console.log('defaultImgUrl ', this.props.imgUrl);
            defaultText = (<div className="default-text">
                {
                    noStyle ? (
                        <div className="col-xs-12">Choose Image To Upload</div>
                    ) : (
                        <div className="col-xs-12">Choose File</div>
                    )
                }

                <div className={ noStyle ? 'file-desc' : "col-xs-12 file-desc" }>
                    Minimum 350px x 350px, 2.5mb upload limit
                </div>
            </div>)
        } else if (this.state.uploadedFile) {
            // console.log('render imgUrl', this.props.imgUrl);
            filePreviewStyle = {
                backgroundImage: "url("+this.state.uploadedFile.src+")",
                width:"100%",
                height:"100%",
                marginTop:"0",
                marginBottom:"0",
                padding:"0",
            };
            fileName = this.state.uploadedFile.title;
        }
        const isDefaultImg = this.props.imgUrl === undefined ? true : false;
        // console.log('loader rerender: ' + isDefaultImg);

        if(this.state.isMouseOver && ((this.state.uploadedFile && this.state.uploadedFile.src)||this.props.imgUrl)){
            deleteIcon = (<div className="delete-icon">
                    <i className="fa fa-times-circle-o fa-2x" onClick={this.handleRemoveFile.bind(this)}></i>
                </div>);
        }

        if(this.props.isUserProfile){
          removeBtn = (
            <div className = 'user-profile-pic-remove-button' onClick = { this.handleRemoveFile.bind(this) }>
              REMOVE
            </div>
          );
        }
        return (
            <div className={ noStyle ? '' : 'col-xs-12' }>
                <div className={ noStyle ? 'file-upload-preview' : 'file-upload-preview col-xs-12' } onMouseEnter = { this.onMouseEnter.bind(this) } onMouseLeave = { this.onMouseLeave.bind(this) }>
                    <div className={ noStyle ? 'form-body' : 'form-body col-xs-12'}>
                        {
                            noStyle ? (
                                <div/>
                            ) : (
                                <label className={ noStyle ? 'control-label' : 'col-xs-12 control-label'}>
                                    {label}
                                </label>
                            )
                        }
                        <div className={ noStyle ? 'wrapper' : 'col-lg-7 col-md-9 col-sm-9 col-xs-9 wrapper' } style = {{ width : '100%', height: '100%' }}>

                            <Dropzone className={ noStyle ? 'dropzone' : 'dropzone col-xs-12'} onDrop={this.onDrop.bind(this)} style = { isDefaultImg && noStyle ? { paddingTop: '0px' } : { paddingTop: '0px'} }>
                                <div className={ noStyle ? 'file-preview' : 'file-preview col-xs-12' } style={filePreviewStyle}></div>
                                {defaultText}
                                {
                                    this.state.isMouseOver && noStyle ? (
                                        <div className = 'col-xs-12 place-holder'>CHANGE</div>
                                    ) : (
                                        <div/>
                                    )
                                }
                            </Dropzone>
                        </div>
                    </div>
                </div>
                {removeBtn}
            </div>
        );
    }
}
