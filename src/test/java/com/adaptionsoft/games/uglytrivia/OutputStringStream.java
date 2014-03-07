package com.adaptionsoft.games.uglytrivia;

import java.io.IOException;
import java.io.OutputStream;

public class OutputStringStream extends OutputStream {

	private StringBuilder string = new StringBuilder();

	@Override
	public void write(int b) throws IOException {
		this.string.append((char) b);
	}

	@Override
	public String toString() {
		return this.string.toString();
	}

}
