package com.rn.sunny.rndemo.view;

import android.util.Log;

import com.facebook.react.uimanager.SimpleViewManager;
import com.facebook.react.uimanager.ThemedReactContext;
import com.facebook.react.uimanager.annotations.ReactProp;

import javax.annotation.Nullable;

/**
 * Created by sunny on 2017/1/6.
 */

public class ReactMaterialdrawerManager extends SimpleViewManager<ReactMaterialView> {

    public static final String RTCNAME="RCTMaterialView";

    @Override
    public String getName() {
        return RTCNAME;
    }

    @Override
    protected ReactMaterialView createViewInstance(ThemedReactContext reactContext) {
        return new ReactMaterialView(reactContext);
    }

    @ReactProp(name = "titleText")
    public void setmTitleText(ReactMaterialView view,  @Nullable String titleText) {
        Log.i("construct","settitleText");
        view.setmTitleText(titleText);
    }

    @ReactProp(name = "titleTextColor")
    public void setmTitleTextColor(ReactMaterialView view, @Nullable String titleTextColor) {
        Log.i("construct","settitleTextColor");
        view.setmTitleTextColor(titleTextColor);
    }

    @ReactProp(name = "titleTextSize")
    public void setmTitleTextSize(ReactMaterialView view, int titleTextSize) {
        Log.i("construct","setTextSize");
        view.setmTitleTextSize(titleTextSize);
    }

}
