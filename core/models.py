from keras.models import Sequential
from keras.layers import Conv2D, MaxPooling2D, Dropout, GlobalAveragePooling2D
from keras.layers import Flatten, Dense
from keras.layers.normalization import BatchNormalization
from core import utils



def get_main_model():

    output_nodes = 16

    # Build a CNN architecture
    model = Sequential()
    model.add(Conv2D(filters=16, kernel_size=3, activation='relu', input_shape=(96, 96, 1)))
    model.add(MaxPooling2D(pool_size=2))

    model.add(Conv2D(filters=32, kernel_size=3, activation='relu'))
    model.add(MaxPooling2D(pool_size=2))

    model.add(Conv2D(filters=64, kernel_size=3, activation='relu'))
    model.add(MaxPooling2D(pool_size=2))

    model.add(Conv2D(filters=128, kernel_size=3, activation='relu'))
    model.add(MaxPooling2D(pool_size=2))

    model.add(Flatten())

    model.add(Dense(512, activation='relu'))
    model.add(Dropout(0.2))

    model.add(Dense(output_nodes))

    # Summarize the model
    model.summary()

    return model

def train_main_model(x_train, y_train):
    # training
    from keras.callbacks import ModelCheckpoint, History
    from keras.optimizers import Adam

    hist = History()
    epochs = 5000
    batch_size = 5

    checkpointer = ModelCheckpoint(filepath='core/weights/weights.final_main_check.hdf5',
                                   verbose=1, save_best_only=True)

    ## TODO: Compile the model
    model = get_main_model()
    model.compile(optimizer='adam', loss='mse', metrics=['accuracy'])

    hist_final = model.fit(x_train, y_train, validation_split=0.2,
                           epochs=epochs, batch_size=batch_size, callbacks=[checkpointer, hist], verbose=1)

    model.save('core/weights/promtly_model_main_final.h5')





def predict_main_model(path):
    x_test = utils.load_image_resized(path)
    model = get_main_model()
    model.load_weights('core/weights/weights.final_main_check.hdf5')
    y_test = model.predict(x_test)
    utils.display(x_test, y_test, "core/outputs/raw_main_predict.png")

    original_img, y_original = utils.label_to_original(y_test, path)
    utils.display(original_img, y_original, "core/outputs/orig_main_predict.png")
    return y_original
