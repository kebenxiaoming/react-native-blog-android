package com.rn.sunny.rndemo.jsmodule;

import android.app.Activity;
import android.content.Intent;
import android.net.Uri;
import android.util.Log;
import android.widget.Toast;

import com.facebook.react.bridge.ActivityEventListener;
import com.facebook.react.bridge.Arguments;
import com.facebook.react.bridge.BaseActivityEventListener;
import com.facebook.react.bridge.Callback;
import com.facebook.react.bridge.LifecycleEventListener;
import com.facebook.react.bridge.Promise;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.bridge.WritableMap;
import com.rn.sunny.rndemo.MainActivity;
import com.rn.sunny.rndemo.MyReactActivity;

import java.util.HashMap;
import java.util.Map;

/**
 * everyone is only a freshman in life,don't be afraid,just live your own life.
 * Have a nice day!
 * Created by sunny on 2017/1/11.
 */

public class ToastModule extends ReactContextBaseJavaModule implements LifecycleEventListener{
    private static final String DURATION_SHORT_KEY = "SHORT";
    private static final String DURATION_LONG_KEY = "LONG";

    private static final String RTCMNAME="MyToastAndroid";

    private static final int IMAGE_PICKER_REQUEST = 12345;
    private static final String E_ACTIVITY_DOES_NOT_EXIST = "E_ACTIVITY_DOES_NOT_EXIST";
    private static final String E_PICKER_CANCELLED = "E_PICKER_CANCELLED";
    private static final String E_FAILED_TO_SHOW_PICKER = "E_FAILED_TO_SHOW_PICKER";
    private static final String E_NO_IMAGE_DATA_FOUND = "E_NO_IMAGE_DATA_FOUND";

    @Override
    public String getName() {
        return RTCMNAME;
    }

    public ToastModule(ReactApplicationContext reactContext) {
        super(reactContext);
        Log.i("construct","construct");
        reactContext.addLifecycleEventListener(this);
    }


    @Override
    public Map<String, Object> getConstants() {
        final Map<String, Object> constants = new HashMap<>();
        constants.put(DURATION_SHORT_KEY, Toast.LENGTH_SHORT);
        constants.put(DURATION_LONG_KEY, Toast.LENGTH_LONG);
        return constants;
    }
    @ReactMethod
    public void show(String message, int duration) {
        Toast.makeText(getReactApplicationContext(), message, duration).show();
    }

    @ReactMethod
    public void testCallback(
            String tag,
            String ancestorTag,
            Promise promise) {
        try {
            Toast.makeText(getReactApplicationContext(), tag+ancestorTag, Toast.LENGTH_LONG).show();
            WritableMap map = Arguments.createMap();
            map.putString("s1",tag);
            map.putString("s2", ancestorTag);
            promise.resolve(map);
        } catch (Exception e) {
            promise.reject(e);
        }
    }

    @ReactMethod
    public void pickImage(Callback successBack, Callback errorBack) {
        Activity currentActivity = getCurrentActivity();

        if (currentActivity == null) {
            errorBack.invoke("Activity doesn't exist");
            return;
        }

        try {
            final Intent galleryIntent = new Intent(Intent.ACTION_PICK);

            galleryIntent.setType("image/*");
            //Intent intent = new Intent(currentActivity, MainActivity.class);
            final Intent chooserIntent = Intent.createChooser(galleryIntent, "Pick an image");
            currentActivity.startActivityForResult(chooserIntent, IMAGE_PICKER_REQUEST);
            successBack.invoke(MyReactActivity.mQueue.take());
        } catch (Exception e) {
            errorBack.invoke(e.getMessage());
            e.printStackTrace();
        }
    }

    @Override
    public void onHostResume() {
        Log.i("construct","resume");
    }

    @Override
    public void onHostPause() {
        Log.i("construct","pause");
    }

    @Override
    public void onHostDestroy() {
        Log.i("construct","destroy");
    }
}
